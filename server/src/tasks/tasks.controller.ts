import {
	Controller,
	Get,
	HttpCode,
	Patch,
	Request,
	UseGuards
} from '@nestjs/common'
import { JwtAccessAuthGuard } from 'src/auth/jwt-access-auth.guard'
import { ValidatedRequest } from 'src/auth/types/request.types'
import { TasksService } from './tasks.service'

@Controller({ path: 'tasks', version: '1' })
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@UseGuards(JwtAccessAuthGuard)
	@Patch('/templates')
	@HttpCode(204)
	async updateTemplates(@Request() req: ValidatedRequest) {
		await this.tasksService.updateTemplatesClient(req.user)
	}

	@UseGuards(JwtAccessAuthGuard)
	@Patch('/responses')
	@HttpCode(204)
	async updateResponses(@Request() req: ValidatedRequest) {
		await this.tasksService.updateResponses()
	}

	@UseGuards(JwtAccessAuthGuard)
	@Get('/executed')
	async getExecuted(@Request() req: ValidatedRequest) {
		return await this.tasksService.getAllExecuted(req.user)
	}

	@UseGuards(JwtAccessAuthGuard)
	@Get('/appointed')
	async getAppointed(@Request() req: ValidatedRequest) {
		return await this.tasksService.getAllAppointed(req.user)
	}
}
