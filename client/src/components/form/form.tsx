'use client'

import { FC, useState } from 'react'
import Button, { ButtonType } from './button/button'
import Field from './field/field'
import styles from './form.module.css'
import { TConfirmedNewUser, TJWTResponse, TLoggingInUser, TNewUser } from '@/types/login_and_register'
import { getTokensFromDb } from '@/functions/getTokensFromDb'
import { createUser } from '@/functions/createUser'
import { redirect } from 'next/navigation'
import { redirectToPage } from '@/functions/redirectToPage'

type TFormProps = {formOption: 'register'|'login'}

const Form: FC<TFormProps> = ({formOption}) => {
	const exampleLogInData: TLoggingInUser = {email: 'email@example.com', password: ''}
	const exampleRegisterData: TNewUser = {username: '', email: '', password: '',}
	const [logInEmailValue, setLogInEmailValue] = useState<string>('')
	const [logInPassValue, setLogInPassValue] = useState<string>('')

	const [registerNameValue, setRegisterNameValue] = useState<string>('')
	const [registerEmailValue, setRegisterEmailValue] = useState<string>('')
	const [registerPassValue, setRegisterPassValue] = useState<string>('')

    // const [regUser,  setRegUser] = useState<TNewUser>(exampleRegisterData)
	// const [logInUser, setLogInUser] = useState<TLoggingInUser>(exampleRegisterData)

	return (
		<div className={styles.form}>
			<div className={styles.entrance} style={{fontFamily: "EuclidCircularBBold"}}>
				Вход
			</div>
			{formOption == 'login' && (
			<div className={styles.content}>
				<Field
					placeholder='Введите почту'
					name='email'
					value={logInEmailValue}
					setValue={setLogInEmailValue}
				/>
				<Field
					placeholder='Введите пароль'
					name='pass'
					value={logInPassValue}
					setValue={setLogInPassValue}
				/>
				<Button
					type={ButtonType.COLORED}
					text={'Войти'}
					action={() => {
						console.log('login')
						let JWT: TJWTResponse = {access_token: '', refresh_token: ''}
						const user: TLoggingInUser = exampleData
						getTokensFromDb(user, JWT)
						console.log(user, JWT)
						setUser(user)}}
				/>
				<Button
					type={ButtonType.PLAIN}
					text={'Зарегистрироваться'}
					action={() => {console.log('redirection')
						redirectToPage('/auth/register')}}
				/>
			</div>)}
            {formOption == 'register' && (
			<div className={styles.content}>
				<Field
					placeholder='Введите имя пользователя'
					name='username'
					value={registerNameValue}
					setValue={setRegisterNameValue}
				/>
				<Field
					placeholder='Введите почту'
					name='username'
					value={registerEmailValue}
					setValue={setRegisterEmailValue}
				/>
				<Field
					placeholder='Введите пароль'
					name='pass'
					value={registerPassValue}
					setValue={setRegisterPassValue}
				/>
				<Button
					type={ButtonType.COLORED}
					text={'Зарегистрироваться'}
					action={() => console.log('register')}
				/>
				<Button
					type={ButtonType.PLAIN}
					text={'Войти'}
					action={() => redirectToPage('/auth/login')}
				/>
			</div>)}
		</div>
	)
}

export default Form
