import { Status } from "@/types/login_and_register"
import { getAccessToken } from "./jwt"
import { TUser, UserRole } from "@/types/user"

const exampleUser: TUser = {
	id: "1",
	username: "Super user",
	email: "superUser@gmail.com",
	role: UserRole.ADMIN,
	isActivated: true,
	tgUsername: "@superUser",
	tgChatId: 0,
	teamId: "red",
	teamColor: "red",
	avatar: "avatar"
}

export const activateUser = async (linkUuid: string): Promise<TUser> => {
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users/activate/` +
			`${linkUuid}`,
		{
			method: 'PATCH',
			credentials: 'include'
		}
	)
	if (response.status == 403) {
		throw Status.FORBIDDEN
	}
	if (response.status == 404) {
		throw Status.NOTFOUND
	}
	return response.json()
}

export const changeUserInfo = async (
	newEmail?: string,
	newUsername?: string,
	newTgName?: string
): Promise<TUser> => {
	const token = getAccessToken()
	if (!token) {
		throw Status.FORBIDDEN
	}
	let requestBody = {}
	if (newEmail) requestBody = Object.assign(requestBody, { email: newEmail })
	if (newUsername)
		requestBody = Object.assign(requestBody, { username: newUsername })
	if (newTgName) requestBody = Object.assign(requestBody, { tgName: newTgName })
	const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users`, {
		method: 'PATCH',
		headers: {
			Authorization: 'Bearer ' + `${token}`
		},
		credentials: 'include'
	})
	if (response.status == 401 || response.status == 403) throw Status.FORBIDDEN
	if (response.status == 404) throw Status.NOTFOUND
	return response.json()
}

export const getUser = async () => {
	const token = await getAccessToken()
	if (!token) {
		throw Status.FORBIDDEN
	}
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	if (response.status == 401 || response.status == 403) throw Status.FORBIDDEN
	if (response.status == 404) throw Status.NOTFOUND
	return await response.json()
}

export const getUserById = async (userId: string): Promise<TUser> => { // TODO: протестировать после появления функции в бд
    const token = await getAccessToken()
    if (!token) {
		throw Status.FORBIDDEN
	}
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users/${userId}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	return exampleUser //response.json()
}

export const changeUserInfoById = async ( // TODO: протестировать после появления функции в бд
	userId: string,
	newEmail?: string,
	newUsername?: string,
	newTgName?: string
): Promise<TUser> => {
	const token = getAccessToken()
	if (!token) {
		throw Status.FORBIDDEN
	}
	let requestBody = {}
	if (newEmail) requestBody = Object.assign(requestBody, { email: newEmail })
	if (newUsername)
		requestBody = Object.assign(requestBody, { username: newUsername })
	if (newTgName) requestBody = Object.assign(requestBody, { tgName: newTgName })
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users/${userId}`, 
		{
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'}
	)
	if (response.status == 401 || response.status == 403) throw Status.FORBIDDEN
	if (response.status == 404) throw Status.NOTFOUND
	return exampleUser //response.json()
}