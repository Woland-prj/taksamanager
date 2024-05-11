import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { getAccessToken } from './jwt'
import { refreshWithThrow } from './refreshWithThrow'

export enum TaskOption {
	EXECUTED = 'executed',
	APPOINTED = 'appointed'
}

export const getTasks = async (type: TaskOption): Promise<ITask[] | null> => {
	const token = getAccessToken()
	if (!token) {
		console.log(token)
		return await refreshWithThrow()
	}
	const urlType: string = type
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/tasks/` +
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
	if (response.ok) return (await response.json()) as ITask[]
	if (response.status === +Status.FORBIDDEN) {
		// return await refreshWithCallback<ITask[] | undefined>(() => getTasks(type))
		return await refreshWithThrow()
	} else throw new Error(Status.NOTFOUND)
}

export const getAllTasks = async (): Promise<ITask[] | null> => {
	// Достает все-все-все задачи из БД
	const token = getAccessToken()
	if (!token) {
		console.log(token)
		return await refreshWithThrow()
	}
	const response = await fetch(
		`http://${
			process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'
		}/api/v1/tasks/all/`,
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
