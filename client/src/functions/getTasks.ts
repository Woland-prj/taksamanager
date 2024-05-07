import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { renewTasks } from './renewTasks'
import { getAccessToken, refreshJWT } from './jwt'
import { redirectToPage } from './redirectToPage'
import { redirect } from 'next/navigation'
import { refreshWithThrow } from './refreshWithThrow'

export enum TaskType {
	EXECUTED = 'executed',
	APPOINTED = 'appointed'
}

// const refreshWithCallback = async <T>(
// 	callback: () => Promise<T>
// ): Promise<T> => {
// 	try {
// 		await refreshJWT()
// 		return callback()
// 	} catch (status) {
// 		console.log('catched status', status)
// 		throw status
// 	}
// }

export const getTasks = async (type: TaskType): Promise<ITask[] | null> => {
	const token = getAccessToken()
	if (!token) {
		// await refreshWithCallback<ITask[] | undefined>(() => getTasks(type))
		console.log(token)
		return await refreshWithThrow()
	}
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
