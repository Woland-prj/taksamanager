import { Status } from "@/types/login_and_register"
import { getAccessToken } from "./jwt"

export const changeTaskByAdmin = async (
    taskId: string,
    newStatus?: Status,
    newExecutorId?: string
) => {
    const token = getAccessToken()
    if (!token) {throw Status.FORBIDDEN}
    let requestBody: unknown
    if (newStatus && newExecutorId) { // newStatus и newExecutorId существуют и не null
        requestBody = {
            status: newStatus,
            executorId: newExecutorId
        }
    } else if(newStatus) { // На входе у функции только newStatus
        requestBody = {
            status: newStatus
        }
    } else if(newExecutorId) { // На входе у функции только newExecutorId
        requestBody = {
            executorId: newExecutorId
        }
    } else requestBody = {}
    const response = await fetch(
        '/api/v1/tasks/admin/' + `${taskId}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            body: JSON.stringify(requestBody)
        }
    )
    if (response.status == 400) throw Status.BADREQUEST // Incorrect status value
    if (response.status == 401) throw Status.FORBIDDEN  // User should be an executor or admin
    if (response.status == 404) throw Status.NOTFOUND   // Task with this uuid is not exist
}

export const changeTaskByExecutor = async (taskId: string, newStatus: Status) => {
    const token = getAccessToken()
    if (!token) {throw Status.FORBIDDEN}
    const response = await fetch(
        '/api/v1/tasks/executor/' + `${taskId}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            body: JSON.stringify({status: newStatus})
        }
    )
    if (response.status == 400) throw Status.BADREQUEST // Incorrect status value
    if (response.status == 401) throw Status.FORBIDDEN  // User should be an executor or admin
    if (response.status == 404) throw Status.NOTFOUND   // Task with this uuid is not exist
}