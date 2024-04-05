import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Request
} from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { JwtAdminAuth, JwtAuth } from 'src/auth/decorators/auth.decorator'
import { ValidatedRequest } from 'src/auth/types/request.types'
import { GetTaskDto, SetExecutorDto } from './dto/task.dto'
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

	@JwtAuth()
	@Get('/executed')
	@ApiOperation({
		summary: 'Get all tasks executed by this user'
	})
	@ApiBearerAuth()
	async getExecuted(@Request() req: ValidatedRequest): Promise<GetTaskDto[]> {
		return this.tasksService.getAllExecuted(req.user)
	}

	@JwtAuth()
	@Get('/appointed')
	@ApiOperation({
		summary: 'Get all tasks appointed by this user'
	})
	@ApiBearerAuth()
	async getAppointed(@Request() req: ValidatedRequest): Promise<GetTaskDto[]> {
		return this.tasksService.getAllAppointed(req.user)
	}

	@JwtAuth()
	@Get(':id')
	@ApiOperation({
		summary: 'Get task by id'
	})
	@ApiBearerAuth()
	@ApiBadRequestResponse({
		description: 'Task with this id is not found'
	})
	async getById(@Param('id') id: string): Promise<GetTaskDto> {
		return this.tasksService.getById(id)
	}

	@ApiOperation({
		summary: 'Set executor for task'
	})
	@JwtAdminAuth()
	@ApiBearerAuth()
	@ApiBadRequestResponse({
		description: 'Task with this id or user with this id is not found'
	})
	@ApiUnauthorizedResponse({
		description: 'You should be a lead'
	})
	@Patch('/executor')
	async setExecutor(@Body() setExecutorDto: SetExecutorDto) {
		return this.tasksService.setExecutor(setExecutorDto)
	}
}
