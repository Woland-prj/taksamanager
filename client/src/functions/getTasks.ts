import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'

export const getTasks = async (token: string | null): Promise<ITask[]> => {
	if (!token) throw Status.FORBIDDEN

	const response = await fetch('http://localhost:3000/api/v1/tasks/executed', {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + `${token}`
		}
	})

	// if (response) console.log(response.status)

	if (response.ok) return await response.json()
	if (response.status === +Status.FORBIDDEN) throw Status.FORBIDDEN
	else throw Status.NOTFOUND
}
