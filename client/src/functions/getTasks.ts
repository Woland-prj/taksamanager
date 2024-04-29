import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { renewTasks } from './renewTasks'

export enum TaskType {
	EXECUTED = 'executed',
	APPOINTED = 'appointed'
}

export const getTasks = async (
	token: string | null,
	type: TaskType
): Promise<ITask[]> => {
	if (!token) throw Status.FORBIDDEN
	const urlType: string = type
	renewTasks()
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/` +
			urlType +
			'/',
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			}
		}
	)
	if (response.ok) return await response.json()
	if (response.status === +Status.FORBIDDEN) throw Status.FORBIDDEN
	else throw Status.NOTFOUND
}
