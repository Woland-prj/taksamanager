import { ForbiddenException, Injectable } from '@nestjs/common'
import { TaskStatus, UserRole } from '@prisma/client'
import { forms_v1 } from 'googleapis'
import { FormsService } from 'src/forms/forms.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IUser } from 'src/users/entities/user.entity'
import { DefaultFields, DefaultTemplates, TaskQ } from './entities/task.entity'

@Injectable()
export class TasksService {
	pollingInterval: number = 1000
	constructor(
		private readonly prismaService: PrismaService,
		private readonly formsService: FormsService
	) {}

	async getAllExecuted(user: IUser) {
		return this.prismaService.task.findMany({
			where: {
				executorId: user.id
			},
			select: {
				id: true,
				clientId: true,
				executorId: true,
				clientName: true,
				executorName: true,
				name: true,
				deadline: true,
				status: true,
				questions: {
					select: {
						id: true,
						questionText: true,
						answerText: true
					}
				}
			}
		})
	}

	async getAllAppointed(user: IUser) {
		return this.prismaService.task.findMany({
			where: {
				clientId: user.id
			},
			select: {
				id: true,
				clientId: true,
				executorId: true,
				clientName: true,
				executorName: true,
				name: true,
				deadline: true,
				status: true,
				questions: {
					select: {
						id: true,
						questionText: true,
						answerText: true
					}
				}
			}
		})
	}

	async updateTemplates() {
		const formData = await this.formsService.getForm()
		formData.items.forEach(async item => {
			if (item.questionItem)
				await this.prismaService.questionTemplate.upsert({
					create: {
						qid: item.questionItem.question.questionId,
						text: item.title
					},
					update: {
						text: item.title
					},
					where: {
						qid: item.questionItem.question.questionId
					}
				})
		})
	}

	async updateTemplatesClient(user: IUser) {
		const dbUser = await this.prismaService.user.findUnique({
			where: {
				id: user.id
			}
		})
		console.log(UserRole.ADMIN > UserRole.CLIENT)
		if (dbUser.role < UserRole.ADMIN) throw new ForbiddenException()
		await this.updateTemplates()
	}

	async updateResponses() {
		const resData = await this.formsService.getFormResponses()
		if (!resData.responses) return
		resData.responses.forEach(async res => {
			const suggestedTask = await this.prismaService.task.findUnique({
				where: {
					responseId: res.responseId
				}
			})
			if (!suggestedTask) this.createTask(res)
		})
	}

	async updateClient(clientEmail: string, taskId: string) {
		const suggestedClient = await this.prismaService.user.findUnique({
			where: {
				email: clientEmail
			}
		})
		if (!suggestedClient) return
		await this.prismaService.task.update({
			where: {
				id: taskId
			},
			data: {
				client: {
					connect: {
						id: suggestedClient.id
					}
				}
			}
		})
	}

	private async getDefaultTemplates(): Promise<DefaultTemplates> {
		const nameTemp = await this.prismaService.questionTemplate.findFirst({
			where: {
				text: DefaultFields.NAME
			}
		})
		const deadlineTemp = await this.prismaService.questionTemplate.findFirst({
			where: {
				text: DefaultFields.DEADLINE
			}
		})
		const clientTemp = await this.prismaService.questionTemplate.findFirst({
			where: {
				text: DefaultFields.CLIENTNAME
			}
		})
		return {
			nameTemp: nameTemp,
			deadlineTemp: deadlineTemp,
			clientTemp: clientTemp
		}
	}

	async createTask(res: forms_v1.Schema$FormResponse) {
		const templates = await this.prismaService.questionTemplate.findMany()
		const tQuestions: TaskQ[] = []
		const { nameTemp, deadlineTemp, clientTemp } =
			await this.getDefaultTemplates()

		// Create questions instances
		templates.forEach(template => {
			if (!res.answers[template.qid]) return
			tQuestions.push({
				questionText: template.text,
				answerText: res.answers[template.qid].textAnswers.answers[0].value
			})
		})

		// Create a task in db
		const task = await this.prismaService.task.create({
			data: {
				name: res.answers[nameTemp.qid].textAnswers.answers[0].value,
				deadline:
					res.answers[deadlineTemp.qid].textAnswers.answers[0].value +
					'T00:00:00.000Z',
				formClientName:
					res.answers[clientTemp.qid].textAnswers.answers[0].value,
				status: TaskStatus.MODIFIED,
				responseId: res.responseId,
				questions: {
					create: [...tQuestions]
				}
			},
			include: {
				questions: true
			}
		})

		// If client authorized link task and his profile as client
		await this.updateClient(res.respondentEmail, task.id)
	}
}
