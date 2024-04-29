import { Task, UserRole } from '@prisma/client'

export const getNotFoundMessage = (name: string) => {
	return `Извините, ${name}. Такса не смогла обнаружить Вас среди своих знакомых. Но она нашла для вас несколько решений:

1. Удостоверьтесь, что вы - ученик лицея "Инфотех" и часть команды медиацентра. (Если это не так, то <b>немедленно</b> прекратите использовать данного бота. Последствия непредсказуемы. Возможно, вы расстроите одного Дениса и ему будет грустно).

2. Убедитесь, что в приложении таксаменеджера вы ввели <b>корректное имя пользователя в Telegram</b>. (Если это не так, то исправьте его и запустите команду /start заново).

3. Если вышеизложенные действия не помогли, то пожалуйста, обратитесь к руководителю медиацентра.`
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
	return `Вам назначена новая задача: <b>${task.name}</b>.
Заказчик: <b>${task.formClientName}</b>.
Заказ поступил от: <b>${task.clientName ? task.clientName : 'Анонимного аккаунта'}</b>.
Вид задачи: <b>${task.type}</b>.
Дедлайн: <b>${task.deadline}</b>.`
}