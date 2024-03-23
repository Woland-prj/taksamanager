import { createUser } from '@/functions/createUser'
import { getTokensFromDb } from '@/functions/getTokensFromDb'
import { saveAccessToken } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'
import { IForm, Status, TNewUser } from '@/types/login_and_register'
import { Dispatch, FC, SetStateAction, useState } from 'react'
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

	const [status, setStatus] = useState<Status | null>(null)

	return (
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
					/>
					<Field
						placeholder='Введите почту'
						name='email'
						value={formData.email}
						setValue={setFormData}
						fieldType='email'
						status={status}
					/>
					<Field
						placeholder='Введите пароль'
						name='pass'
						value={formData.password}
						setValue={setFormData}
						fieldType='password'
						status={status}
					/>
				</>
			)}

			<Button
				type={ButtonType.COLORED}
				text={'Зарегистрироваться'}
				action={async () => {
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
						if (status === Status.BADREQUEST) setStatus(Status.FORBIDDEN)
						if (status === Status.EXIST) setStatus(Status.FORBIDDEN)
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
