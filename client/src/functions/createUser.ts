import { IForm, Status, TConfirmedNewUser } from '@/types/login_and_register'

export const createUser = async (user: IForm): Promise<TConfirmedNewUser> => {
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user),
      credentials: 'include'
		}
	)

	if (response.status == 201) return await response.json()
	if (response.status == 409) throw Status.EXIST // 409 - Conflict
	throw Status.BADREQUEST
}
