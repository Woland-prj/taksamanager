'use client'
export const saveLoggedInToken = async (value: 'true' | 'false') => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', value)
    }
}
export const getLoggedInToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('isLoggedIn')
    } else {
        return null
    }
}