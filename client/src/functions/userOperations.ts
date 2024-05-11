import { Status } from '@/types/login_and_register'
import { TUpdateUser, TUser, UserClass, UserRole } from '@/types/user'
import { getAccessToken } from './jwt'
import { refreshWithThrow } from './refreshWithThrow'

export const activateUser = async (linkUuid: string): Promise<TUser> => {
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/users/activate/` + `${linkUuid}`,
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
	updateUser: TUpdateUser
): Promise<TUser | null> => {
	const token = getAccessToken()
	if (!token) {
		return refreshWithThrow()
	}
	let requestBody = {}
	if (updateUser.tgUsername && updateUser.tgUsername.length > 0)
		requestBody = Object.assign(requestBody, {
			tgUsername: updateUser.tgUsername
		})
	if (updateUser.username && updateUser.username.length > 0)
		requestBody = Object.assign(requestBody, {
			username: updateUser.username
		})
	if (updateUser.avatar && updateUser.avatar.length > 0)
		requestBody = Object.assign(requestBody, {
			avatar: updateUser.avatar
		})
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/users`,
		{
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + `${token}`,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(updateUser)
		}
	)
	if (response.status == 401 || response.status == 403) throw Status.FORBIDDEN
	if (response.status == 404) throw Status.NOTFOUND
	return await response.json()
}

export const getUser = async () => {
	const token = getAccessToken()
	if (!token) {
		throw Status.FORBIDDEN
	}
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/users`,
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

export const getUserById = async (userId: string): Promise<TUser | null> => {
	// TODO: протестировать после появления функции в бд
	const token = getAccessToken()
	if (!token) {
		return refreshWithThrow()
	}
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/users/${userId}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	return response.json()
}

export const changeUserInfoById = async (
	// TODO: протестировать после появления функции в бд
	userId: string,
	updateUser: TUpdateUser
): Promise<TUser | null> => {
	const token = getAccessToken()
	if (!token) {
		return refreshWithThrow()
	}
	const colorRegExp = /#[0-9A-Fa-f]{6} /
	let requestBody = {}
	if (updateUser.role && updateUser.role in UserRole)
		requestBody = Object.assign(requestBody, { role: updateUser.role })
	if (updateUser.class && updateUser.class in UserClass)
		requestBody = Object.assign(requestBody, { class: updateUser.class })
	if (updateUser.teamColor && colorRegExp.test(updateUser.teamColor))
		requestBody = Object.assign(requestBody, {
			teamColor: updateUser.teamColor
		})
	if (updateUser.tgUsername && updateUser.tgUsername.length > 0)
		requestBody = Object.assign(requestBody, {
			tgUsername: updateUser.tgUsername
		})
	if (updateUser.username && updateUser.username.length > 0)
		requestBody = Object.assign(requestBody, {
			username: updateUser.username
		})
	if (updateUser.avatar && updateUser.avatar.length > 0)
		requestBody = Object.assign(requestBody, {
			avatar: updateUser.avatar
		})
	console.log(requestBody)
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/users/${userId}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + `${token}`,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(updateUser)
		}
	)
	if (response.status == 401 || response.status == 403) throw Status.FORBIDDEN
	if (response.status == 404) throw Status.NOTFOUND
	return (await response.json()) as TUser
}
