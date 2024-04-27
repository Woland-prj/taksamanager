import { IJwt } from '@/types/jwt'
import { Status, TLoggingInUser } from '@/types/login_and_register'

export const saveAccessToken = async (tokens: IJwt) => {
	localStorage.setItem('accessToken', tokens.accessToken)
}

export const getAccessToken = () => {
	return localStorage.getItem('accessToken')
}

export const refreshJWT = async () => {
	const response = await fetch('http://localhost:3000/api/v1/auth/refresh', {
		method: 'GET'
	})
	if (response.ok) {
		const data: IJwt = await response.json() as IJwt
		saveAccessToken(data)
	}
	else throw Status.FORBIDDEN
}

export const getTokensFromDb = async (user: TLoggingInUser): Promise<IJwt> => {
	const response = await fetch('http://localhost:3000/api/v1/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(user)
	})

	if (response.status == 201) {
		return await response.json()
	}
	throw Status.FORBIDDEN
}