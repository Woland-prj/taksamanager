import { TUser } from '@/types/user'
import { getAccessToken } from './jwt'
import { refreshWithThrow } from './refreshWithThrow'

export const getAllUsers = async (): Promise<TUser[] | null> => {
	const token = getAccessToken()
	if (!token) {
		console.log(token)
		return await refreshWithThrow()
	}
	const res = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users/all`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	return (await res.json()) as TUser[]
}
