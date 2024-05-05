import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { renewTasks } from './renewTasks'
import { getAccessToken } from './jwt'

export enum TaskOption {
	EXECUTED = 'executed',
	APPOINTED = 'appointed'
}

export const getTasks = async (option: TaskOption): Promise<ITask[]> => {
	const token = getAccessToken()
	if (!token) throw Status.FORBIDDEN
	const urlType: string = option
	renewTasks()
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/` +
			urlType +
			'/',
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	if (response.ok) return await response.json()
	if (response.status === +Status.FORBIDDEN) throw Status.FORBIDDEN
	else throw Status.NOTFOUND
}

export const getUserTasks = async (userId: string): Promise<ITask[]> => {
	const token = getAccessToken()
	if (!token) throw Status.FORBIDDEN
	renewTasks()
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/user` +
			userId +
			'/',
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + `${token}`
			},
			credentials: 'include'
		}
	)
	if (response.ok) return await response.json()
	if (response.status === +Status.FORBIDDEN) throw Status.FORBIDDEN
	else throw Status.NOTFOUND
}