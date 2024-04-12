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

export const enum TaskType {
	POST = 'POST',
    DESIGN = 'DESIGN',
    VIDEO = 'VIDEO',
    MONTAGE = 'MONTAGE',
    PHOTO = 'PHOTO',
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

export const enum TagOption {
    POST = 'POST',
    DESIGN = 'DESIGN',
    VIDEO = 'VIDEO',
    MONTAGE = 'MONTAGE',
    PHOTO = 'PHOTO',

	MODIFIED = 'MODIFIED', // В процессе модерации
	CREATED = 'CREATED',   // Задача ожидает подтверждения исполнителя
	IN_WORK = 'INWORK',
	COMPLETED = 'COMPLETED',
	VERIFY_COMPLETED = 'VERIFYCOMPLETED',
	REJECTED = 'REJECTED',
	REJECTED_BY_ADMIN = 'REJECTEDBYADMIN',
	EXPIRED = 'EXPIRED',

    DEADLINE = 'DEADLINE',
    UNDEFINED = 'UNDEFINED',
}