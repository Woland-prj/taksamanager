/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Patch,
	Request
} from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiHeader,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import {
	JwtAdminAuth,
	JwtAuth,
	JwtExecutorAuth
} from 'src/auth/decorators/auth.decorator'
import { ValidatedRequest } from 'src/auth/types/request.types'
import {
	GetTaskDto,
	TaskAdminUpdateDto,
	TaskExecutorUpdateDto
} from './dto/task.dto'
import { TasksService } from './tasks.service'

@ApiTags('CRUD tasks operation (in development)')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer <access_jwt>'
})
@Controller({ path: 'tasks', version: '1' })
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	// ВНИМАНИЕ!!! КОД ДЕНИСА КИСТАНОВА
	@JwtAuth()
	@Get('/all')
	@ApiOperation({
		summary: 'Get all tasks from all users'
	})
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiOkResponse({ type: [GetTaskDto] })
	@ApiBearerAuth()
	async getVeryAll(@Request() req: ValidatedRequest): Promise<GetTaskDto[]> {
		return this.tasksService.getVeryAll()
	}
	// ВНИМАНИЕ!!! КОНЕЦ КОДА ДЕНИСА КИСТАНОВА

	@JwtAuth()
	@Get()
	@ApiOperation({
		summary: 'Get all tasks by this user'
	})
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiOkResponse({ type: [GetTaskDto] })
	@ApiBearerAuth()
	async getAll(@Request() req: ValidatedRequest): Promise<GetTaskDto[]> {
		return this.tasksService.getAll(req.user)
	}

	@Patch('/templates')
	@HttpCode(204)
	@ApiOperation({
		summary: 'Forced renew templates for questions'
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
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiOkResponse({ type: [GetTaskDto] })
	@ApiBearerAuth()
	async getExecuted(@Request() req: ValidatedRequest): Promise<GetTaskDto[]> {
		return this.tasksService.getAllExecuted(req.user)
	}

	@JwtAuth()
	@Get('/appointed')
	@ApiOperation({
		summary: 'Get all tasks appointed by this user'
	})
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiOkResponse({ type: [GetTaskDto] })
	@ApiBearerAuth()
	async getAppointed(@Request() req: ValidatedRequest): Promise<GetTaskDto[]> {
		return this.tasksService.getAllAppointed(req.user)
	}

	@JwtAdminAuth()
	@Patch('/status/expired')
	@ApiOperation({
		summary: 'Set expired tasks status (only by admin)'
	})
	@HttpCode(204)
	@ApiNoContentResponse({ description: 'Data updated successfuly' })
	async setExpiredStatus() {
		await this.tasksService.setExpiredStatus()
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
		summary: 'Update task executor or status'
	})
	@ApiBearerAuth()
	@ApiOkResponse({
		description: 'Data updated successfuly'
	})
	@ApiBadRequestResponse({
		description:
			'User with this id is not found or user id is not uuid or incorrect status value'
	})
	@ApiUnauthorizedResponse({
		description: 'User should be an admin'
	})
	@ApiNotFoundResponse({
		description: 'Task with this uuid is not exist'
	})
	@JwtAdminAuth()
	@Patch('/admin/:id')
	async updateByAdmin(
		@Request() req: ValidatedRequest,
		@Body() taskAdminUpdateDto: TaskAdminUpdateDto,
		@Param('id', new ParseUUIDPipe()) id: string
	) {
		return this.tasksService.updateByAdmin(req.user.id, id, taskAdminUpdateDto)
	}

	@ApiOperation({
		summary: 'Update status'
	})
	@ApiBearerAuth()
	@ApiOkResponse({
		description: 'Data updated successfuly'
	})
	@ApiBadRequestResponse({
		description: 'Incorrect status value'
	})
	@ApiUnauthorizedResponse({
		description: 'User should be an executor or admin'
	})
	@ApiNotFoundResponse({
		description: 'Task with this uuid is not exist'
	})
	@JwtExecutorAuth()
	@Patch('/executor/:id')
	async updateByExecutor(
		@Body() taskExecutorUpdateDto: TaskExecutorUpdateDto,
		@Param('id', new ParseUUIDPipe()) id: string
	) {
		return this.tasksService.updateByExecutor(id, taskExecutorUpdateDto)
	}
}
