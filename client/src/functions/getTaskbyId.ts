import { Status } from '@/types/login_and_register'
import { renewTasks } from './renewTasks'
import { getAccessToken } from './jwt'
import { ITask } from '@/types/tasks'
import { refreshWithThrow } from './refreshWithThrow'

export const getTaskbyId = async (id: string): Promise<ITask | null> => {
	const token = getAccessToken()
	if (!token) refreshWithThrow()
	renewTasks()
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/` +
			`${id}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	if (response.ok) return (await response.json()) as ITask
	else throw Status.BADREQUEST
}
