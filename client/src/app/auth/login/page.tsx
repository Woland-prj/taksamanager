'use client'
import Form from '@/components/form/form'
import styles from '../login.module.css''

export default function LoginPage() {
	return (
		<main className={styles.wrapper}>
			<Form formOption='login' />
		</main>
	)
}
