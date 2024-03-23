import { getTokensFromDb } from '@/functions/getTokensFromDb'
import { saveAccessToken } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'
import { IForm, Status, TLoggingInUser } from '@/types/login_and_register'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBlock from '../error/Error'
import styles from './LogInForm.module.css'
import Button, { ButtonType } from './button/button'
import Field from './field/field'

type TLogInFormProps = {
	setUser: Dispatch<SetStateAction<TLoggingInUser>>
}

// 201 - Tokens generated succesfully
// 401 - Unauthorized

export const LogInForm: FC<TLogInFormProps> = ({ setUser }) => {
	const [isEmpty, setIsEmpty] = useState<boolean>(false)
	const [formData, setFormData] = useState<IForm>({
		email: '',
		password: ''
	})
	const [status, setStatus] = useState<Status | null>(null)

	const isNotEmpty = (data: IForm): boolean => {
		if (data.email == '' || data.password == '' || data.username == '') {
			return false
		}
		return true
	}

	return (
		<div className={styles.content}>
			{status && <ErrorBlock status={status} />}
			{isEmpty && <ErrorBlock text='Поля не должны быть пустыми' />}
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
							redirectToPage('/dashboard')
						} catch (status) {
							if (status === Status.FORBIDDEN) setStatus(Status.FORBIDDEN)
						}
					} else {
						setIsEmpty(true)
					}
				}}
			/>
			<Button
				type={ButtonType.PLAIN}
				text={'Зарегистрироваться'}
				action={async () => {
					console.log('redirection')
					redirectToPage('/auth/register')
				}}
			/>
		</div>
	)
}
