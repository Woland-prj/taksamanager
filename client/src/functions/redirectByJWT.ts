'use client'

import { refreshJWT } from "./jwt"
import { usePathname, useRouter } from "next/navigation"
import { getLoggedInToken, saveLoggedInToken } from "./isLoggedIn"

export default function redirectByJWT() {
    const pathname = usePathname()
    const router = useRouter()
	const isLoggedInSTRING = getLoggedInToken()
	const isLoggedIn = isLoggedInSTRING == 'true' ? true : isLoggedInSTRING == 'false' ? false : null
	try {
		if (!pathname.startsWith('/auth')) {refreshJWT()}
		if (pathname.startsWith('/auth') && isLoggedIn){
			saveLoggedInToken('true')
			router.replace('/dashboard')
		}	
	}
	catch {
		console.log('refresh токен устарел')
		saveLoggedInToken('false')
		router.replace('/auth/login')
	}
}