import { CookieOptions } from 'express'

type RefreshCookieData = {
	name: string
	options: CookieOptions
}

export const refreshCookieData: RefreshCookieData = {
	name: 'refreshJwt',
	options: {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true
	}
}
