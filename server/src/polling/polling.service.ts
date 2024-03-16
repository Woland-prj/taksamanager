import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { FormsService } from 'src/forms/forms.service'
import { TasksService } from 'src/tasks/tasks.service'

@Injectable()
export class PollingService {
	constructor(
		private readonly formsService: FormsService,
		private readonly tasksService: TasksService
	) {}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async pollingQuestions() {
		console.log('lol')
		const resData = await this.formsService.getFormResponses()
		if (!resData.responses) return
		resData.responses.forEach(res => this.tasksService.createTask(res))
	}
}
