import { IJwt } from '@/types/jwt'
import { TLoggingInUser } from '@/types/login_and_register'

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
	throw new Error(`${response.status}`)
}
