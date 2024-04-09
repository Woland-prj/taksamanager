'use client'
import Form from '@/components/form/form'
import styles from '../login.module.css'
import { useEffect } from 'react'
import { checkJWTAndRedirect } from '@/functions/checkJWTAndRedirect'
import { getAccessToken } from '@/functions/jwt'

export default function RegisterPage() {
	useEffect(() => {
		checkJWTAndRedirect(getAccessToken())
	}, [])
	return (
		<main className={styles.wrapper}>
			<Form formOption='register' />
		</main>
	)
}
