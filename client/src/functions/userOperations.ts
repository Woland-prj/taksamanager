import { Status } from "@/types/login_and_register"
import { getAccessToken } from "./jwt"
import { TUser, UserRole } from "@/types/user"
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
	const response = await fetch('/api/v1/users', {
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

export const getUserById = async (userId: string): Promise<TUser> => {
    // const token = await getAccessToken()
    // if (!token) {throw Status.FORBIDDEN}
    return {
        id: userId,
        username: 'Тестовое имя',
        email: 'Тестовый email',
        role: UserRole.EXECUTOR,
        isActivated: true,
        tgUsername: '',
        tgChatId: 0,
        teamId: '',
    }
}
// (alias) type TUser = {
//     id: string;
//     username: string;
//     email: string;
//     role: string;
//     isActivated: true;
//     tgUsername: string;
//     tgChatId: 0;
//     teamId: string;
// }