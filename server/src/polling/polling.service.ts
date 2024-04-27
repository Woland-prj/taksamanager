import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { FormsService } from 'src/forms/forms.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { TasksService } from 'src/tasks/tasks.service'

@Injectable()
export class PollingService {
	constructor(
		private readonly formsService: FormsService,
		private readonly tasksService: TasksService,
		private readonly prismaService: PrismaService
	) {}

	@Cron('*/30 * * * * *')
	async pollingTemplates() {
		console.log('Ping form questions templates...')
		await this.tasksService.updateTemplates()
		console.log('Ping success!')
	}

	@Cron('*/30 * * * * *')
	async pollingQuestions() {
		console.log('Ping form responses...')
		await this.tasksService.updateResponses()
		console.log('Ping success!')
	}
}
