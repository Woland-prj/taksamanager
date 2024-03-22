import {
	Controller,
	Get,
	HttpCode,
	Patch,
	Request,
	UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAccessAuthGuard } from 'src/auth/jwt-access-auth.guard'
import { ValidatedRequest } from 'src/auth/types/request.types'
import { GetAllTasksDto } from './dto/task.dto'
import { TasksService } from './tasks.service'

@ApiTags('CRUD tasks operation (in development)')
@Controller({ path: 'tasks', version: '1' })
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Patch('/templates')
	@HttpCode(204)
	@ApiOperation({
		summary: 'Forced renew tempates for questions'
	})
	async updateTemplates() {
		await this.tasksService.updateTemplatesClient()
	}

	@ApiOperation({
		summary: 'Forced renew google form responses'
	})
	@Patch('/responses')
	@HttpCode(204)
	async updateResponses() {
		await this.tasksService.updateResponses()
	}

	@UseGuards(JwtAccessAuthGuard)
	@Get('/executed')
	@ApiOperation({
		summary: 'Get all tasks executed by this user'
	})
	@ApiBearerAuth()
	async getExecuted(
		@Request() req: ValidatedRequest
	): Promise<GetAllTasksDto[]> {
		return await this.tasksService.getAllExecuted(req.user)
	}

	@UseGuards(JwtAccessAuthGuard)
	@Get('/appointed')
	@ApiOperation({
		summary: 'Get all tasks appointed by this user'
	})
	@ApiBearerAuth()
	async getAppointed(
		@Request() req: ValidatedRequest
	): Promise<GetAllTasksDto[]> {
		return await this.tasksService.getAllAppointed(req.user)
	}
}
