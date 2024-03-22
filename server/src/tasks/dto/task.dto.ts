import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'

class TaskQ {
	id: string
	questionText: string
	answerText: string
}

// export const enum TaskStatus {
// 	MODIFIED = 'MODIFIED',
// 	CREATED = 'CREATED',
// 	INWORK = 'INWORK',
// 	COMPLETED = 'COMPLETED',
// 	VERIFYCOMPLETED = 'VERIFYCOMPLETED',
// 	REJECTED = 'REJECTED',
// 	REJECTEDBYLEAD = 'REJECTEDBYLEAD',
// 	REJECTEDBYADMIN = 'REJECTEDBYADMIN'
// }

export class GetAllTasksDto {
	id: string
	name: string
	status: $Enums.TaskStatus
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
