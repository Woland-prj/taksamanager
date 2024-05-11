'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getAccessToken } from './jwt'

export default function useRedirectByJWT() {
	const router = useRouter()
	useEffect(() => {
		const token = getAccessToken()
		const isLoggedIn = token ? true : false
		if (isLoggedIn) router.replace('/dashboard')
		else router.replace('/auth/login')
	}, [])

	// const isLoggedInSTRING = getLoggedInToken()

	// const isLoggedIn =
	// 	isLoggedInSTRING == 'true'
	// 		? true
	// 		: isLoggedInSTRING == 'false'
	// 			? false
	// 			: null

	// try {
	// 	if (!pathname.startsWith('/auth')) {
	// 		try {
	// 			if (!isLoggedIn) await refreshJWT()
	// 		} catch (status) {
	// 			console.log('catched status', status)
	// 			if (status === Status.FORBIDDEN) redirectToPage('/auth/login')
	// 		}
	// 	}
	// 	if (pathname.startsWith('/auth')) {
	// 		// saveLoggedInToken('true')
	// 		router.replace('/dashboard')
	// 	}
	// } catch {
	// 	console.log('refresh токен устарел')
	// 	// saveLoggedInToken('false')
	// 	if (!pathname.startsWith('/auth')) {
	// 		router.replace('/auth/login')
	// 	}
	//}
}
