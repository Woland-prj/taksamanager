import { createUser } from '@/functions/createUser'
import { getTokensFromDb } from '@/functions/getTokensFromDb'
import { saveAccessToken } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'
import { IForm, Status, TNewUser } from '@/types/login_and_register'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBlock from '../error/Error'
import Button, { ButtonType } from './button/button'
import Field from './field/field'
import styles from './registerForm.module.css'

type TRegisterFormProps = { setUser: Dispatch<SetStateAction<TNewUser>> }

export const RegisterForm: FC<TRegisterFormProps> = ({ setUser }) => {
	const [formData, setFormData] = useState<IForm>({
		email: '',
		password: '',
		username: ''
	})
	const [isEmpty, setIsEmpty] = useState<boolean>(false)

	const isNotEmpty = (data: IForm): boolean => {
		if (data.email == '' || data.password == '' || data.username == '') {
			return false
		}
		return true
	}

	const [status, setStatus] = useState<Status | null>(null)

	return (
		<div className={styles.content}>
			{status && <ErrorBlock status={status} />}
			{isEmpty && <ErrorBlock text='Поля не должны быть пустыми' />}
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
						setIsEmpty(true)
						try {
							await createUser(formData)
							const jwt = await getTokensFromDb({
								email: formData.email,
								password: formData.password
							})
							await saveAccessToken(jwt)
							setStatus(Status.CREATED)
							redirectToPage('/dashboard')
						} catch (status) {
							console.log(status)
							if (status === Status.BADREQUEST) setStatus(Status.BADREQUEST)
							if (status === Status.EXIST) setStatus(Status.EXIST)
						}
					} else {
						setIsEmpty(true)
					}
				}}
			/>
			<Button
				type={ButtonType.PLAIN}
				text={'Войти'}
				action={() => redirectToPage('/auth/login')}
			/>
		</div>
	)
}
