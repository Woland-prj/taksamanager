import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { IsIn, IsOptional, IsUUID } from 'class-validator'

class TaskQ {
	id: string
	questionText: string
	answerText: string
}

// export const enum TaskStatus {
// MODIFIED = 'MODIFIED',
// CREATED = 'CREATED',
// INWORK = 'INWORK',
// COMPLETED = 'COMPLETED',
// VERIFYCOMPLETED = 'VERIFYCOMPLETED',
// REJECTED = 'REJECTED',
// REJECTEDBYLEAD = 'REJECTEDBYLEAD',
// REJECTEDBYADMIN = 'REJECTEDBYADMIN'
// }

export class GetTaskDto {
	id: string
	name: string
	status: $Enums.TaskStatus
	type: $Enums.TaskType
	deadline: Date
	executorId: string
	executorName: string
	clientId: string
	clientName: string
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
		'VERIFIYREJECTED'
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
		'VERIFIYREJECTED'
	])
	status: string

	@IsOptional()
	@IsUUID()
	executorId: string
}

export class TaskExecutorUpdateDto {
	@IsOptional()
	@IsIn(['INWORK', 'COMPLETED', 'REJECTED'])
	status: string
}
