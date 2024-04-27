'use client'
import Form from '@/components/form/form'
import styles from '../login.module.css'

export default function RegisterPage() {
	return (
		<main className={styles.wrapper}>
			<Form formOption='register' />
		</main>
	)
}
