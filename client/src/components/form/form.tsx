'use client'

import { FC, useState } from 'react'
import Button, { ButtonType } from './button/button'
import Field from './field/field'
import styles from './form.module.scss'

type TFormProps = {formOption: 'register'|'login'}

const Form: FC<TFormProps> = ({formOption}) => {
	const [nameValue, setNameValue] = useState<string>('')
	const [passValue, setPassValue] = useState<string>('')

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
					action={() => console.log('login')}
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
