'use client'
import Form from '@/components/form/form'
import styles from '../login.module.css'
import redirectByJWT from '@/functions/redirectByJWT'

export default function RegisterPage() {
	redirectByJWT()
	return (
		<main className={styles.wrapper}>
			<Form formOption='register' />
		</main>
	)
}
