import { BadRequestException, Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { TaskStatus } from '@prisma/client'
import { forms_v1 } from 'googleapis'
import { FormsService } from 'src/forms/forms.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { DefaultFields, TaskQ } from './entities/task.entity'

@Injectable()
export class TasksService {
	pollingInterval: number = 1000
	constructor(
		private readonly prismaService: PrismaService,
		private readonly formsService: FormsService
	) {}

	create(createTaskDto: CreateTaskDto) {
		return 'This action adds a new task'
	}

	findAll() {
		return `This action returns all tasks`
	}

	findOne(id: number) {
		return `This action returns a #${id} task`
	}

	update(id: number, updateTaskDto: UpdateTaskDto) {
		return `This action updates a #${id} task`
	}

	remove(id: number) {
		return `This action removes a #${id} task`
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

	async createTask(res: forms_v1.Schema$FormResponse) {
		const templates = await this.prismaService.questionTemplate.findMany()
		const tQuestions: TaskQ[] = []
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
		templates.forEach(template => {
			if (!res.answers[template.qid]) throw new BadRequestException()
			tQuestions.push({
				questionText: template.text,
				answerText: res.answers[template.qid].textAnswers.answers[0].value
			})
		})
		const clientName = res.answers[clientTemp.qid].textAnswers.answers[0].value
		const suggestedClient = await this.prismaService.user.findUnique({
			where: {
				email: res.respondentEmail
			}
		})
		await this.prismaService.task.create({
			data: {
				name: res.answers[nameTemp.qid].textAnswers.answers[0].value,
				deadline: res.answers[deadlineTemp.qid].textAnswers.answers[0].value,
				clientId: suggestedClient ? suggestedClient.id : null,
				clientName: suggestedClient
					? clientName + ` (${suggestedClient.username})`
					: clientName,
				status: TaskStatus.MODIFIED
			}
		})
	}

	@Cron('10 * * * * *')
	async pollingQuestions() {
		console.log('lol')
		const resData = await this.formsService.getFormResponses()
		if (!resData.responses) return
		resData.responses.forEach(res => this.createTask(res))
	}
}
