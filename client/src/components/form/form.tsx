'use client'

import { TLoggingInUser, TNewUser } from '@/types/login_and_register'
import cn from 'clsx'
import localFont from 'next/font/local'
import { FC, useState } from 'react'
import styles from './form.module.css'
import { LogInForm } from './formOptions/LogInForm'
import { RegisterForm } from './formOptions/RegisterForm'

const euclidMedium = localFont({
	src: '../../fonts/EuclidCircularBMedium.ttf',
	display: 'swap'
})

type TFormProps = { formOption: 'register' | 'login' }

/**
 * Generate a form based on the formOption provided.
 *
 * @param {TFormProps} formOption - the type of form to generate
 * @return {JSX.Element} the form component JSX
 */
const Form: FC<TFormProps> = ({ formOption }) => {
	// const exampleLogInData: TLoggingInUser = {
	// 	email: 'email@example.com',
	// 	password: ''
	// }
	// const exampleRegisterData: TNewUser = {
	// 	username: '',
	// 	email: '',
	// 	password: ''
	// }
	// const [registerUser, setRegisterUser] =
	// 	useState<TNewUser>(exampleRegisterData)
	// const [logInUser, setLogInUser] = useState<TLoggingInUser>(exampleLogInData)

	return (
		<div className={styles.form}>
			<div className={cn(styles.entrance, euclidMedium.className)}>
				{formOption == 'login' ? 'Вход' : 'Регистрация'}
			</div>
			{formOption == 'login' && <LogInForm/>}
			{formOption == 'register' && <RegisterForm/>}
		</div>
	)
}

export default Form
