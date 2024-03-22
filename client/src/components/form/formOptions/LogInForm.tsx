import { Dispatch, FC, SetStateAction, useState } from "react"
import Field from "./field/field"
import styles from "./LogInForm.module.css"
import Button, { ButtonType } from "./button/button"
import { TJWTResponse, TLoggingInUser } from "@/types/login_and_register"
import { getTokensFromDb } from "@/functions/getTokensFromDb"
import { redirectToPage } from "@/functions/redirectToPage"
import cn from 'clsx'

type TLogInFormProps = {
    setUser: Dispatch<SetStateAction<TLoggingInUser>>
}
type TPossibleErrorStates = '201' | '401'
// 201 - Tokens generated succesfully
// 401 - Unauthorized

export const LogInForm: FC<TLogInFormProps> = ({setUser}) => {
    const [emailValue, setEmailValue] = useState<string>('')
	const [passValue, setPassValue] = useState<string>('')
	const [errorState, setErrorState] = useState<TPossibleErrorStates>('401')


    return (
        <div className={styles.content}>
            <Field
                placeholder='Введите почту'
                name='email'
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
                text={'Войти'}
                action={async () => {
                    console.log('login')
                    let JWT: TJWTResponse = { access_token: '', refresh_token: '' }
                    const user: TLoggingInUser = {
                        email: 'test@test.org',
                        password: '123'
                    }
                    await getTokensFromDb(user, JWT)
                    console.log(user, JWT)
                    setUser(user)
                }}
            />
            <Button
                type={ButtonType.PLAIN}
                text={'Зарегистрироваться'}
                action={() => {
                    console.log('redirection')
                    redirectToPage('/auth/register')
                }}
            />
        </div>
)}