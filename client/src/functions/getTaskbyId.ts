import { Status } from '@/types/login_and_register'
import { renewTasks } from './renewTasks'

export const getTaskbyId = async (id: string, token: string | null) => {
	if (!token) throw Status.FORBIDDEN
	renewTasks()
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/` +
			`${id}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			}
		}
	)
	if (response.ok) return await response.json()
	else throw Status.BADREQUEST
}
