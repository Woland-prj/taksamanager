import { CookieOptions } from 'express'

type RefreshCookieData = {
	name: string
	options: CookieOptions
}

export const refreshCookieData: RefreshCookieData = {
	name: 'refresh_jwt',
	options: {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true
	}
}
