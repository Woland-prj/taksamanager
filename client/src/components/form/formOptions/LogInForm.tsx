'use client'
import { saveAccessToken, getTokensFromDb } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'
import { IForm, Status, TLoggingInUser } from '@/types/login_and_register'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBlock from '../error/Error'
import styles from './LogInForm.module.css'
import Button, { ButtonType } from './button/button'
import Field from './field/field'
import { useRouter } from 'next/navigation'

// 201 - Tokens generated succesfully
// 401 - Unauthorized

export const LogInForm = () => {
	const router = useRouter()
	const [isEmpty, setIsEmpty] = useState<boolean>(false)
	const [formData, setFormData] = useState<IForm>({
		email: '',
		password: ''
	})
	const [status, setStatus] = useState<Status | null>(null)

	const isNotEmpty = (data: IForm): boolean => {
		setStatus(null)
		if (data.email == '' || data.password == '' || data.username == '') {
			return false
		}
		return true
	}

	return (
		<>
			<ErrorBlock status={status} isEmpty={isEmpty} />
			<div className={styles.content}>
				<Field
					placeholder='Введите почту'
					name='email'
					value={formData.email}
					setValue={setFormData}
					fieldType='email'
					status={status}
					isEmpty={isEmpty}
				/>
				<Field
					placeholder='Введите пароль'
					name='pass'
					value={formData.password}
					setValue={setFormData}
					fieldType='password'
					status={status}
					isEmpty={isEmpty}
				/>
				<Button
					type={ButtonType.COLORED}
					text={'Войти'}
					action={async () => {
						if (isNotEmpty(formData)) {
							setIsEmpty(false)
							try {
								const jwt = await getTokensFromDb(formData)
								await saveAccessToken(jwt)
								setStatus(Status.CREATED)
								router.replace('/dashboard')
							} catch (status) {
								if (status === Status.FORBIDDEN) {setStatus(Status.FORBIDDEN)}
							}
						} else {
							setIsEmpty(true)
						}
					}}
				/>
				<div>
					<span className={styles.plain_text}>
						Если у вас нет аккаунта, то для начала вам нужно
					</span>
					<Button
						type={ButtonType.PLAIN}
						className={styles.bold_text}
						text={'зарегистрироваться'}
						action={async () => {
							console.log('redirection')
							redirectToPage('/auth/register')
						}}
					/>
				</div>
			</div>
		</>
	)
}
