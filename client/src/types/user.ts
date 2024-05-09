export const enum UserRole {
	ROOT = 'ROOT',
	ADMIN = 'ADMIN',
	EXECUTOR = 'EXECUTOR',
	CLIENT = 'CLIENT'
}

export type ListOption<T> = {
	value: T
	label: string
}

export type TUser = {
	id: string // Также служит и для получения картинок
	username: string
	email: string
	role: UserRole
	isActivated: boolean
	tgUsername: string
	tgChatId: number
	teamId: string
	teamColor: string // Цвет команды
	avatar: string
	class: number
}
// GET /api/v1/users/avatar
type TProfileImageIn = {
	id: string // обращаюсь к серверу за картинкой по айдишнику user
}
type TProfileImageOut = {
	avatar: string // После обработки возвращает base64 строку в которой закодирована картинка
}

// PATCH /api/v1/users
export type TUpdateUser = {
	username?: string
	avatar?: string
	role?: UserRole
	class?: number
	teamColor?: string
	tgUsername?: string
}
// Output такой же, как и был

// GET /api/v1/users/team
// API достает по запросу массив всех пользователей
// На входе просто JWT
// На выходе тип:
type TGetAllUsers = { users: TUser[] }
// По ролям я их сам раскидаю
