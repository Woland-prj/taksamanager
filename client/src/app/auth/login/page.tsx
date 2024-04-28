'use client'
import Form from '@/components/form/form'
import styles from '../login.module.css'
import { useEffect, useLayoutEffect } from 'react'
import { getAccessToken, refreshJWT } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'

export default function LoginPage() {

	return (
		<main className={styles.wrapper}>
			<Form formOption='login' />
		</main>
	)
}
