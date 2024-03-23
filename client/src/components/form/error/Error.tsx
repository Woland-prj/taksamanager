import { Status } from '@/types/login_and_register'
import Image from 'next/image'
import { FC } from 'react'
import styles from './Error.module.css'

const ErrorBlock: FC<{ status: Status | null }> = ({ status }) => {
	const getTextByStatus = (status: Status) => {
		switch (status) {
			case Status.FORBIDDEN:
				return 'Неверный логин или пароль'
			case Status.EXIST:
				return 'Такого пользователя не существует'
		}
	}

	return (
		<div className={styles.error}>
			<Image src='/error.svg' alt='error_icon' width={40} height={35} />
			<p>{getTextByStatus(status)}</p>
		</div>
	)
}

export default ErrorBlock
