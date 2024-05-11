/* eslint-disable prettier/prettier */
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Task, TaskStatus, TaskType } from '@prisma/client'
import { forms_v1 } from 'googleapis'
import { FormsService } from 'src/forms/forms.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IUser } from 'src/users/entities/user.entity'
import {
	ClientStatus,
	GetTaskDto,
	SetExecutorDto,
	TaskAdminUpdateDto,
	TaskExecutorUpdateDto
} from './dto/task.dto'
import {
	DefaultFields,
	DefaultTemplates,
	TaskFormType,
	TaskQ
} from './entities/task.entity'
import { BotService } from 'src/tgbot/bot.service'
import {
	getNewAppointedTaskMessage,
	getNewExecutedTaskMessage,
	getNewStatusTaskMessage
} from 'src/tgbot/messages.template'

@Injectable()
export class TasksService {
	pollingInterval: number = 1000

	constructor(
		private readonly prismaService: PrismaService,
		private readonly formsService: FormsService,
		private readonly botService: BotService
	) {}

	async getAllExecuted(user: IUser): Promise<GetTaskDto[]> {
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
				type: true,
				result: true,
				formClientName: true,
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

	async getAllAppointed(user: IUser): Promise<GetTaskDto[]> {
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
				type: true,
				result: true,
				formClientName: true,
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

	async getAll(user: IUser): Promise<GetTaskDto[]> {
		return this.prismaService.task.findMany({
			where: {
				OR: [
					{
						executorId: user.id
					},
					{
						clientId: user.id
					}
				]
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
				result: true,
				type: true,
				formClientName: true,
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

	// ВНИМАНИЕ!!! КОД ДЕНИСА КИСТАНОВА
	async getVeryAll(): Promise<GetTaskDto[]> {
		return this.prismaService.task.findMany({
			select: {
				id: true,
				clientId: true,
				executorId: true,
				clientName: true,
				executorName: true,
				name: true,
				deadline: true,
				status: true,
				result: true,
				type: true,
				formClientName: true,
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
	// ВНИМАНИЕ!!! КОНЕЦ КОДА ДЕНИСА КИСТАНОВА

	async getById(id: string): Promise<GetTaskDto> {
		return this.prismaService.task.findUnique({
			where: {
				id: id
			},
			select: {
				id: true,
				clientId: true,
				executorId: true,
				clientName: true,
				executorName: true,
				formClientName: true,
				name: true,
				deadline: true,
				status: true,
				type: true,
				result: true,
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

	async setExecutor(setExecutorDto: SetExecutorDto) {
		return this.prismaService.task.update({
			where: {
				id: setExecutorDto.taskId
			},
			data: {
				executor: {
					connect: {
						id: setExecutorDto.userId
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

	async updateTemplatesClient() {
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
		const typeTemp = await this.prismaService.questionTemplate.findFirst({
			where: {
				text: DefaultFields.TYPE
			}
		})
		return {
			nameTemp: nameTemp,
			deadlineTemp: deadlineTemp,
			clientTemp: clientTemp,
			typeTemp: typeTemp
		}
	}

	private async convertTextTypeToDbType(
		formType: string
	): Promise<TaskType | null> {
		switch (formType) {
			case TaskFormType.FORM_VIDEO:
				return TaskType.VIDEO

			case TaskFormType.FORM_PHOTO:
				return TaskType.PHOTO

			case TaskFormType.FORM_POST:
				return TaskType.POST

			case TaskFormType.FORM_DESIGN:
				return TaskType.DESIGN

			case TaskFormType.FORM_MONTAGE:
				return TaskType.MONTAGE

			default:
				return null
		}
	}

	async createTask(res: forms_v1.Schema$FormResponse) {
		const templates = await this.prismaService.questionTemplate.findMany()
		const tQuestions: TaskQ[] = []
		const { nameTemp, deadlineTemp, clientTemp, typeTemp } =
			await this.getDefaultTemplates()

		const taskFormType = res.answers[typeTemp.qid].textAnswers.answers[0].value
		const convertedType = await this.convertTextTypeToDbType(taskFormType)

		console.log(convertedType)

		if (!convertedType) return

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
				type: convertedType,
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

	async updateByAdmin(adminId: string, id: string, dto: TaskAdminUpdateDto) {
		const task = await this.getById(id)
		if (!task) throw new NotFoundException()
		let query = {
			where: {
				id: id
			},
			data: {}
		}
		console.log(id, adminId, dto)
		const admin = await this.prismaService.user.findUnique({
			where: {
				id: adminId
			}
		})
		if (!admin) throw new BadRequestException('admin with this id is not exist')

		if (dto.status) {
			query.data['status'] = dto.status
		}
		if (dto.executorId) {
			const suggestedExecutor = await this.prismaService.user.findUnique({
				where: {
					id: dto.executorId
				}
			})
			if (!suggestedExecutor)
				throw new BadRequestException('executor with this id is not exist')
			query.data['executor'] = {
				connect: {
					id: dto.executorId
				}
			}
		}
		const result = await this.prismaService.task.update(query)
		if (dto.executorId) {
			this.botService.sendMessage(
				dto.executorId,
				getNewExecutedTaskMessage(result as unknown as Task)
			)
			this.botService.sendMessage(
				admin.id,
				getNewAppointedTaskMessage(result as unknown as Task)
			)
		}
		if (dto.status) {
			this.botService.sendMessage(
				result.executorId,
				getNewStatusTaskMessage(result as unknown as Task)
			)
			if (dto.status in ClientStatus) {
				this.botService.sendMessage(
					result.clientId,
					getNewStatusTaskMessage(result as unknown as Task)
				)
			}
		}
		return result
	}

	async updateByExecutor(id: string, dto: TaskExecutorUpdateDto) {
		const task = await this.prismaService.task.findFirst({
			where: {
				id: id
			}
		})
		if (!task) throw new NotFoundException()
		const req = {
			where: {
				id: id
			},
			data: {}
		}
		if (dto.status) {
			req.data['status'] = dto.status
			if (dto.status === TaskStatus.MODIFIED) {
				req.data['executorId'] = null
				req.data['executorName'] = null
			}
		}
		if (dto.result) {
			req.data['result'] = dto.result
		}
		const result = await this.prismaService.task.update(req)
		if (dto.status) {
			this.botService.sendMessage(
				task.clientId,
				getNewStatusTaskMessage(result as unknown as Task)
			)
		}
		return result
	}

	async setExpiredStatus() {
		const checkedTasks = await this.prismaService.task.findMany({
			where: {
				status: {
					in: [TaskStatus.WAITCONSENT, TaskStatus.INWORK, TaskStatus.MODIFIED]
				}
			}
		})
		const taskIdsForUpdate = []
		if (!checkedTasks) return
		checkedTasks.forEach(task => {
			if (task.deadline.getTime() < new Date().getTime()) {
				taskIdsForUpdate.push(task.id)
			}
		})
		await this.prismaService.task.updateMany({
			where: {
				id: {
					in: taskIdsForUpdate
				}
			},
			data: {
				status: TaskStatus.EXPIRED
			}
		})
	}
}
