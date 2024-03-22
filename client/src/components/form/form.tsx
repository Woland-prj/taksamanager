'use client'

import {
	TLoggingInUser,
	TNewUser
} from '@/types/login_and_register'
import { FC, useState } from 'react'
import styles from './form.module.css'
import { RegisterForm } from './formOptions/RegisterForm'
import { LogInForm } from './formOptions/LogInForm'

type TFormProps = { formOption: 'register' | 'login' }

const Form: FC<TFormProps> = ({ formOption }) => {
	const exampleLogInData: TLoggingInUser = {
		email: 'email@example.com',
		password: ''
	}
	const exampleRegisterData: TNewUser = {
		username: '',
		email: '',
		password: ''
	}
	const [registerUser,  setRegisterUser] = useState<TNewUser>(exampleRegisterData)
	const [logInUser, setLogInUser] = useState<TLoggingInUser>(exampleLogInData)

	return (
		<div className={styles.form}>
			<div className={styles.entrance}
				style={{ fontFamily: 'EuclidCircularBBold' }}
			>
				Вход
			</div>
			{formOption == 'login' && (
				<LogInForm setUser={setLogInUser}/>
			)}
			{formOption == 'register' && (
				<RegisterForm setUser={setRegisterUser}/>
			)}
		</div>
	)
}

export default Form
