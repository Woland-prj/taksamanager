export const enum TaskStatus {
	MODIFIED = 'MODIFIED',
	CREATED = 'CREATED',
	INWORK = 'INWORK',
	COMPLETED = 'COMPLETED',
	VERIFYCOMPLETED = 'VERIFYCOMPLETED',
	REJECTED = 'REJECTED',
	REJECTEDBYLEAD = 'REJECTEDBYADMIN',
	EXPIRED = 'EXPIRED',
}

export interface ITask {
	id: string
	name: string
	status: TaskStatus
	type: string
	deadline: Date
	executorId?: string
	executorName?: string
	clientId?: string
	clientName?: string
	questions: ITaskQuestion[]
}

export interface ITaskQuestion {
	id: string
	questionText: string
	answerText: string
}
