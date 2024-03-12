'use client'

import { FC, useRef, useState } from 'react'
import Button, { ButtonType } from './button/button'
import Field from './field/field'
import styles from './form.module.scss'
import { TConfirmedUser, TUnidentifiedUser } from '@/types/user'
import { getUserFromDb } from '@/functions/getUserFromDb'

type TFormProps = {formOption: 'register'|'login'}

const Form: FC<TFormProps> = ({formOption}) => {
	const exampleData: TConfirmedUser = {id: 'id', profileId: 'profileId',
    	username: 'username', email: 'email@example.com'}
	const [nameValue, setNameValue] = useState<string>('')
	const [passValue, setPassValue] = useState<string>('')
    const [user,  setUser] = useState<TConfirmedUser>(exampleData)
	return (
		<div className={styles.form}>
			<h2>Вход</h2>
			{formOption == 'login' && (
			<div className={styles.content}>
				<Field
					placeholder='Введите имя пользователя'
					name='username'
					value={nameValue}
					setValue={setNameValue}
				/>
				<Field
					placeholder='Введите пароль'
					name='pass'
					value={passValue}
					setValue={setPassValue}
				/>
				<Button
					type={ButtonType.COLORED}
					text={'Войти'}
					action={() => {
						console.log('login')
						let user: TConfirmedUser = exampleData
						getUserFromDb({username: nameValue,
							email: 'mail',
							password: passValue}, user)
						setUser(user)}}
				/>
				<Button
					type={ButtonType.PLAIN}
					text={'Зарегистрироваться'}
					action={() => console.log('redirect to red page')}
				/>
			</div>)}
            {formOption == 'register' && (
			<div className={styles.content}>
				<Field
					placeholder='Введите имя пользователя'
					name='username'
					value={nameValue}
					setValue={setNameValue}
				/>
				<Field
					placeholder='Введите пароль'
					name='pass'
					value={passValue}
					setValue={setPassValue}
				/>
				<Button
					type={ButtonType.COLORED}
					text={'Войти'}
					action={() => console.log('login')}
				/>
				<Button
					type={ButtonType.PLAIN}
					text={'Зарегистрироваться'}
					action={() => console.log('redirect to red page')}
				/>
			</div>)}
		</div>
	)
}

export default Form
