'use server'

import { permanentRedirect } from "next/navigation"

export const checkJWTAndRedirect = async (accessToken: string | null) => {
    // if (accessToken != null) {
    //     const response = await fetch('http://localhost:3200/api/v1/profile', { // обращение к серверу за юзером по входящему токену
    //         method: 'GET',
    //         headers: {
    //             Authorization: 'Bearer ' + `${accessToken}`
    //         }
    //     })
    //     console.log(response)
    //     // overwriteUser(response) // Сохранение юзера в редаксе
    //     // permanentRedirect('https://localhost:3000/dashboard')
    // } else {
    //     permanentRedirect('https://localhost:3000/auth/login')
    // }

}