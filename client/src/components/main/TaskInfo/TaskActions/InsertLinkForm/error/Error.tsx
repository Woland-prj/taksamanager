import { Status } from '@/types/login_and_register'
import Image from 'next/image'
import { FC } from 'react'
import styles from './Error.module.css'

interface IErrorProps {
	status?: Status | null
	isEmpty: boolean
}

const ErrorBlock: FC<IErrorProps> = ({ status, isEmpty }) => {
	const emptyText: string = 'Поля не должны быть пустыми'
	const getTextByStatus = (status: Status) => {
		switch (status) {
			case Status.BADREQUEST:
				return 'Некорректный email адресс'
			case Status.EXIST:
				return 'Пользователь с таким email уже существует'
			case Status.FORBIDDEN:
				return 'Неверный логин или пароль'
			default:
				return ''
		}
	}

	return (
		<div className={styles.error}>
			{((status && status != Status.CREATED) || isEmpty) && (
				<Image src='/error.svg' alt='error_icon' width={40} height={35} />
			)}
			{status && <p>{getTextByStatus(status)}</p>}
			{isEmpty && !status && <p>{emptyText}</p>}
			{/* {(!status && !isEmpty) ||
				(status && isEmpty && <p>Что-то пошло не так</p>)} */}
		</div>
	)
}

export default ErrorBlock
