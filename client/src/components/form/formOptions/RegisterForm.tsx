import { redirectToPage } from "@/functions/redirectToPage"
import Button, { ButtonType } from "./button/button"
import Field from "./field/field"
import { Dispatch, FC, SetStateAction, useState } from "react"
import styles from './registerForm.module.css'
import { TJWTResponse, TLoggingInUser, TNewUser } from "@/types/login_and_register"
import { createUser } from "@/functions/createUser"
import { getTokensFromDb } from "@/functions/getTokensFromDb"
import cn from "clsx"

type TPossibleErrorStates = '201' | '400' | '409' // 201 - User and his profile was successfully created.
// 400 - [ "email must be an email" | "password should not be empty" | "username should not be empty" ]
// 409 - User with email "email" already exist.
type TRegisterFormProps = {setUser: Dispatch<SetStateAction<TNewUser>>}

export const RegisterForm: FC<TRegisterFormProps> = ({setUser}) => {
	const [errorState, setErrorState] = useState<TPossibleErrorStates>('201')
	const [nameValue, setNameValue] = useState<string>('')
	const [emailValue, setEmailValue] = useState<string>('')
	const [passValue, setPassValue] = useState<string>('')

	const fieldClass = cn(styles.error && errorState != '201')

    return (
        <div className={styles.content}>
			<Field
				placeholder='Введите имя пользователя'
				name='username'
				value={nameValue}
				setValue={setNameValue}
				isThereAnyError = {errorState != '201'}
			/>
			<Field
				placeholder='Введите почту'
				name='username'
				value={emailValue}
				setValue={setEmailValue}
				isThereAnyError = {errorState != '201'}
			/>
			<Field
				placeholder='Введите пароль'
				name='pass'
				value={passValue}
				setValue={setPassValue}
				isThereAnyError = {errorState != '201'}
			/>
			<Button
				type={ButtonType.COLORED}
				text={'Зарегистрироваться'}
				action={async () => {
					console.log('registration')
					let JWT: TJWTResponse = { access_token: '', refresh_token: '' }
                    let user: TLoggingInUser
					const userInfoFromFields: TNewUser = {
						username: nameValue,
						email: emailValue,
						password: passValue
					}
					await createUser(userInfoFromFields, user)
                    await getTokensFromDb(user, JWT)
                    console.log(user, JWT)
                    setUser(user)}}
			/>
			<Button
				type={ButtonType.PLAIN}
				text={'Войти'}
				action={() => redirectToPage('/auth/login')}
			/>
		</div>
    )
}