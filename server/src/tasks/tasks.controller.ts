import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'

@Controller({ path: 'tasks', version: '1' })
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Patch('/templates')
	@HttpCode(204)
	updateTemplates() {
		this.tasksService.updateTemplates()
	}

	@Post()
	create(@Body() createTaskDto: CreateTaskDto) {
		return this.tasksService.create(createTaskDto)
	}

	@Get()
	findAll() {
		return this.tasksService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tasksService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		return this.tasksService.update(+id, updateTaskDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tasksService.remove(+id)
	}
}
