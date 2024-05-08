'use client'

import { refreshJWT } from './jwt'
import { usePathname, useRouter } from 'next/navigation'
import { getLoggedInToken, saveLoggedInToken } from './isLoggedIn'
import { Status } from '@/types/login_and_register'
import { redirectToPage } from './redirectToPage'

export default async function redirectByJWT() {
	const pathname = usePathname()
	const router = useRouter()
	const isLoggedInSTRING = getLoggedInToken()
	const isLoggedIn =
		isLoggedInSTRING == 'true'
			? true
			: isLoggedInSTRING == 'false'
				? false
				: null
	try {
		if (!pathname.startsWith('/auth')) {
			try {
				await refreshJWT()
			} catch (status) {
				console.log('catched status', status)
				if (status === Status.FORBIDDEN) redirectToPage('/auth/login')
			}
		}
		if (pathname.startsWith('/auth') && isLoggedIn) {
			saveLoggedInToken('true')
			router.replace('/dashboard')
		}
	} catch {
		console.log('refresh токен устарел')
		saveLoggedInToken('false')
		if (!pathname.startsWith('/auth')) { router.replace('/auth/login') }
	}
}

