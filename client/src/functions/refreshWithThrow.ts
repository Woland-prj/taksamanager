import { refreshJWT } from './jwt'

export const refreshWithThrow = async (): Promise<null> => {
	try {
		await refreshJWT()
		return null
	} catch (status) {
		console.log('catched status', status)
		throw status
	}
}
