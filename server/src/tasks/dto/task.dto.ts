import { ApiProperty } from '@nestjs/swagger'
import { TaskStatus, TaskType } from '@prisma/client'
import { IsIn, IsOptional, IsUUID } from 'class-validator'

class TaskQ {
	id: string
	questionText: string
	answerText: string
}

export enum ClientStatus {
	INWORK = 'INWORK',
	VERIFYCOMPLETED = 'VERIFYCOMPLETED',
	VERIFYREJECTED = 'VERIFYREJECTED'
}

export class GetTaskDto {
	id: string
	name: string
	status: TaskStatus
	type: TaskType
	deadline: Date
	executorId: string
	executorName: string
	clientId: string
	clientName: string
	formClientName: string
	result: string | null
	@ApiProperty({ type: () => [TaskQ] })
	questions: {
		id: string
		questionText: string
		answerText: string
	}[]
}

export class SetExecutorDto {
	@IsUUID()
	taskId: string

	@IsUUID()
	userId: string
}

export class SetStatusDto {
	@IsUUID()
	taskId: string

	@IsIn([
		'MODIFIED',
		'WAITCONSENT',
		'INWORK',
		'COMPLETED',
		'VERIFYCOMPLETED',
		'REJECTED',
		'VERIFYREJECTED'
	])
	status: string
}

export class TaskAdminUpdateDto {
	@IsOptional()
	@IsIn([
		'MODIFIED',
		'WAITCONSENT',
		'INWORK',
		'COMPLETED',
		'VERIFYCOMPLETED',
		'REJECTED',
		'VERIFYREJECTED'
	])
	status: string

	@IsOptional()
	@IsUUID()
	executorId: string

	@IsOptional()
	result: string
}

export class TaskExecutorUpdateDto {
	@IsOptional()
	@IsIn(['INWORK', 'COMPLETED', 'REJECTED'])
	status: string

	@IsOptional()
	result: string
}
