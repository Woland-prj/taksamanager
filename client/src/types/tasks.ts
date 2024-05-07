export const createTaskURL = 'https://forms.gle/aevQapAyVCtDbPsSA'

export const enum TaskStatus {
	MODIFIED = 'MODIFIED',
	WAITCONSENT = 'WAITCONSENT',
	INWORK = 'INWORK',
	COMPLETED = 'COMPLETED',
	VERIFYCOMPLETED = 'VERIFYCOMPLETED',
	REJECTED = 'REJECTED',
	REJECTEDBYLEAD = 'REJECTEDBYADMIN',
	EXPIRED = 'EXPIRED'
}

export const enum TaskType {
	POST = 'POST',
	DESIGN = 'DESIGN',
	VIDEO = 'VIDEO',
	MONTAGE = 'MONTAGE',
	PHOTO = 'PHOTO',
	ANIMATION = 'ANIMATION',
	EXECUTED = 'EXECUTED'
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
	//result: string 				// Готовый результат по задаче (ссылка на работу)
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
	ANIMATION = 'ANIMATION',

	MODIFIED = 'MODIFIED', // В процессе модерации
	WAIT_CONSENT = 'WAIT_CONSENT', // Задача ожидает подтверждения исполнителя
	IN_WORK = 'INWORK',
	COMPLETED = 'COMPLETED',
	VERIFY_COMPLETED = 'VERIFYCOMPLETED',
	REJECTED = 'REJECTED',
	REJECTED_BY_ADMIN = 'REJECTEDBYADMIN',
	EXPIRED = 'EXPIRED',

	UNDEFINED = 'UNDEFINED'
}
