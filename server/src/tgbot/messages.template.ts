import { Task, TaskStatus, TaskType, UserRole } from '@prisma/client'

export const getNotFoundMessage = (name: string) => {
	return `Извините, ${name}. Такса не смогла обнаружить Вас среди своих знакомых. Но она нашла для вас несколько решений:

1. Удостоверьтесь, что вы - ученик лицея "Инфотех" и часть команды медиацентра. (Если это не так, то <b>немедленно</b> прекратите использовать данного бота. Последствия непредсказуемы. Возможно, вы расстроите одного Дениса и ему будет грустно).

2. Убедитесь, что в приложении таксаменеджера вы ввели <b>корректное имя пользователя в Telegram</b>. (Если это не так, то исправьте его и запустите команду /start заново).

3. Если вышеизложенные действия не помогли, то пожалуйста, обратитесь к руководителю медиацентра.`
}

const getTaskType = (type: TaskType): string => {
	let strType: string = ''
	switch (type) {
		case TaskType.PHOTO:
			strType = 'ФОТО'
			break
		case TaskType.VIDEO:
			strType = 'ВИДЕО'
			break
		case TaskType.POST:
			strType = 'ПОСТ'
			break
		case TaskType.DESIGN:
			strType = 'ДИЗАЙН'
			break
		case TaskType.MONTAGE:
			strType = 'МОНТАЖ'
			break
		default:
			strType = '¯\\_(ツ)_/¯ Неизвестный тип задачи. Обратись к администратору.'
	}
	return strType
}

export const getStartMessage = (username: string, role: UserRole) => {
	let strRole: string = ''
	switch (role) {
		case UserRole.ROOT:
			strRole = 'повелителем'
			break
		case UserRole.ADMIN:
			strRole = 'администратором'
			break
		case UserRole.EXECUTOR:
			strRole = 'исполнителем'
			break
		case UserRole.CLIENT:
			strRole = 'заказчиком'
			break
		default:
			strRole = '¯\\_(ツ)_/¯ Попроси главу отдела назначить тебе роль'
	}
	return `Такса приветствует тебя, ${username}! Теперь ты можешь получать уведомления о назначенных и исполняемых тобой задачах. Боллее подробную информацию можно узнасть в приложении таксменеджера. На данный момент ты являешься <b><i>${strRole}</i></b>.`
}

export const getNewExecutedTaskMessage = (task: Task) => {
	let strType: string = getTaskType(task.type)
	return `Вам назначена новая задача: <b>${task.name}</b>.
Заказчик: <b>${task.formClientName}</b>.
Заказ поступил от: <b>${task.clientName ? task.clientName : 'Анонимного аккаунта'}</b>.
Вид задачи: <b>${strType}</b>.
Дедлайн: <b>${task.deadline.getDate()}.${task.deadline.getMonth()}.${task.deadline.getFullYear()}</b>.

Вам следует принять или отклонить задачу. Для этого перейдите в <b>приложение таксамэнеджера</b>`
}

export const getNewAppointedTaskMessage = (task: Task) => {
	let strType: string = getTaskType(task.type)
	return `Задача <b>${task.name}</b> от заказчика <b>${task.formClientName}</b> типа <b>${strType}</b>, выполняемая до <b>${task.deadline.getDate()}.${task.deadline.getMonth()}.${task.deadline.getFullYear()}</b>, успешно назначена исполнителю <b>${task.executorName}</b>. 

Такса ждет ответа исполнителя.`
}

const getTaskStatus = (status: TaskStatus): string => {
	let str: string = ''
	switch (status) {
		case TaskStatus.MODIFIED:
			str = 'МОДЕРИРОВАНИЕ'
			break
		case TaskStatus.WAITCONSENT:
			str = 'НАЗНАЧЕНИЕ'
			break
		case TaskStatus.INWORK:
			str = 'В РАБОТЕ'
			break
		case TaskStatus.COMPLETED:
			str = 'ВЫПОЛНЕНО'
			break
		case TaskStatus.VERIFYCOMPLETED:
			str = 'ВЫПОЛНЕННО И ПОДТВЕРЖДЕНО'
			break
		case TaskStatus.REJECTED:
			str = 'ОТКЛОНЕНО'
			break
		case TaskStatus.VERIFYREJECTED:
			str = 'ОТКЛОНЕНО И ПОДТВЕРЖДЕНО'
			break
		default:
			str = '¯\\_(ツ)_/¯ Неизвестный статус задачи. Обратись к администратору.'
	}
	return str
}
export const getNewStatusTaskMessage = (task: Task) => {
	let strType: string = getTaskType(task.type)
	let strStatus: string = getTaskStatus(task.status)
	return `Такса заметила новый статус у задачи <b>${task.name}</b> типа <b>${strType}</b>: <b>${strStatus}</b>. Подробную информацию можно получить в <b>приложении таксаменеджера</b>`
}
