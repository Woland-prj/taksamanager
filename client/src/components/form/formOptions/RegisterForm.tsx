'use client'
import { createUser } from '@/functions/createUser'
import { saveAccessToken, getTokensFromDb } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'
import { IForm, Status} from '@/types/login_and_register'
import { useState } from 'react'
import ErrorBlock from '../error/Error'
import styles from './LogInForm.module.css'
import Button, { ButtonType } from './button/button'
import Field from '../Field/field'
import { useRouter } from 'next/navigation'
import { saveLoggedInToken } from '@/functions/isLoggedIn'


export const RegisterForm = () => {
	const router = useRouter()
	const [formData, setFormData] = useState<IForm>({
		email: '',
		password: '',
		username: ''
	})
	const [isEmpty, setIsEmpty] = useState<boolean>(false)

	const isNotEmpty = (data: IForm): boolean => {
		setStatus(null)
		if (data.email == '' || data.password == '' || data.username == '') {
			return false
		}
		return true
	}

	const [status, setStatus] = useState<Status | null>(null)

	return (
		<>
			<ErrorBlock status={status} isEmpty={isEmpty} />
			<div className={styles.content}>
				{formData.username != undefined && (
					<>
						<Field
							placeholder='Введите имя пользователя'
							name='username'
							value={formData.username}
							setValue={setFormData}
							fieldType='username'
							status={status}
							isEmpty={isEmpty}
						/>
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
					</>
				)}

				<Button
					type={ButtonType.COLORED}
					text={'Зарегистрироваться'}
					action={async () => {
						if (isNotEmpty(formData)) {
							setIsEmpty(false)
							try {
								await createUser(formData)
								const jwt = await getTokensFromDb({
									email: formData.email,
									password: formData.password
								})
								await saveAccessToken(jwt)
								setStatus(Status.CREATED)
								saveLoggedInToken('true')
								router.replace('/dashboard')
							} catch  {
								try {
									const jwt = await getTokensFromDb({
										email: formData.email,
										password: formData.password
									})
									await createUser(formData)
									await saveAccessToken(jwt)
									setStatus(Status.CREATED)
									saveLoggedInToken('true')
									router.replace('/dashboard')
								}
								catch (error) {
									saveLoggedInToken('false')
									if (status === Status.BADREQUEST) setStatus(Status.BADREQUEST)
									if (status === Status.EXIST) setStatus(Status.EXIST)
								}
								
							}
						} else {
							setIsEmpty(true)
						}
					}}
				/>
				<div className={styles.plain_text}>
					<span className={styles.plain_text}>
						Если у вас аккаунта, вы можете {''}
					</span>
					<Button
						type={ButtonType.PLAIN}
						className={styles.bold_text}
						text={'войти'}
						action={async () => {
							console.log('redirection')
							router.push('/auth/login')
						}}
					/>
				</div>
			</div>
		</>
	)
}
