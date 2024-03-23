import { IJwt } from '@/types/jwt'

export const saveAccessToken = async (tokens: IJwt) => {
	localStorage.setItem('accessToken', tokens.accessToken)
}

export const getAccessToken = () => {
	return localStorage.getItem('accessToken')
}
