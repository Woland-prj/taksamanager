import { Status } from "@/types/login_and_register"
import { getAccessToken } from "./jwt"

export const getTaskbyId = async (id: string, token: string | null) => {
    if(!token) throw Status.FORBIDDEN
    const response = await fetch('http://localhost:3000//api/v1/tasks/' + {id}, {
        method: 'GET',
		headers: {
			Authorization: 'Bearer ' + `${token}`
		}
    })
    if(response.ok) return await response.json()
    else throw Status.BADREQUEST
}