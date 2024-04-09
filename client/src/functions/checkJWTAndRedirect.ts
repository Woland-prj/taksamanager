'use server'

import { getAccessToken } from "./jwt"



export const checkJWTAndRedirec = async () => {
    const accessToken: string | null = getAccessToken()
    if (accessToken != null) {
        const response = await fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${accessToken}`
            }
        })
    }

}