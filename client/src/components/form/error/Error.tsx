import { Status } from '@/types/login_and_register'
import Image from 'next/image'
import { FC } from 'react'
import styles from './Error.module.css'

interface IErrorProps {
	status?: Status
	text?: string
}

const ErrorBlock: FC<IErrorProps> = ({ status, text }) => {
	const getTextByStatus = (status: Status) => {
		switch (status) {
			case Status.BADREQUEST:
				return 'Некорректный email адресс'
			case Status.EXIST:
				return 'Пользователь с таким email уже существует'
			case Status.FORBIDDEN:
				return 'Неверный логин или пароль'
		}
	}

	return (
		<div className={styles.error}>
			<Image src='/error.svg' alt='error_icon' width={40} height={35} />
			{status && !text && <p>{getTextByStatus(status)}</p>}
			{!status && text && <p>{text}</p>}
			{(!status && !text) || (status && text && <p>Что-то пошло не так</p>)}
		</div>
	)
}

export default ErrorBlock
