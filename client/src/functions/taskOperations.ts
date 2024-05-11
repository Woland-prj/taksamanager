import { Status } from '@/types/login_and_register'
import { getAccessToken } from './jwt'
import { TaskStatus } from '@/types/tasks'
import { refreshWithThrow } from './refreshWithThrow'

export const changeTaskByAdmin = async (
	taskId: string,
	newStatus?: TaskStatus,
	newExecutorId?: string
) => {
	const token = getAccessToken()
	if (!token) {
		refreshWithThrow()
	}
	let requestBody: unknown
	if (newStatus && newExecutorId) {
		// newStatus и newExecutorId существуют и не null
		requestBody = {
			status: newStatus,
			executorId: newExecutorId
		}
	} else if (newStatus) {
		// На входе у функции только newStatus
		requestBody = {
			status: newStatus
		}
	} else if (newExecutorId) {
		// На входе у функции только newExecutorId
		requestBody = {
			executorId: newExecutorId
		}
	} else requestBody = {}
	console.log(taskId)
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/admin/` +
			`${taskId}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody),
			credentials: 'include'
		}
	)
	if (response.status == 400) throw Status.BADREQUEST // Incorrect status value
	if (response.status == 401) throw Status.FORBIDDEN // User should be an executor or admin
	if (response.status == 404) throw Status.NOTFOUND // Task with this uuid is not exist
}

export const changeTaskByExecutor = async (
	taskId: string,
	newStatus: TaskStatus,
	result?: string
) => {
	const token = getAccessToken()
	if (!token) {
		return refreshWithThrow()
	}
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/executor/` +
			`${taskId}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: newStatus, result: result }),
			credentials: 'include'
		}
	)
	if (response.status == 400) throw Status.BADREQUEST // Incorrect status value
	if (response.status == 401) throw Status.FORBIDDEN // User should be an executor or admin
	if (response.status == 404) throw Status.NOTFOUND // Task with this uuid is not exist
}
