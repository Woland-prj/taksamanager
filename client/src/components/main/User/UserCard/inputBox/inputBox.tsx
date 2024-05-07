import { ChangeEvent, FC, useState } from "react"

export const enum InputType {
    CLASS = 'CLASS',
    TEXT = 'TEXT',
    USER_ROLE = 'USER_ROLE',
    USER_TEAM = 'USER_TEAM'
}

type TInputBoxProps = {
    type?: InputType
    canChange?: boolean
    text?: string
}

export const inputBox: FC<TInputBoxProps> = ({type, canChange, text}) => {
    const definedType: InputType = type ? type : InputType.TEXT
    const [value, setValue] = useState<string>('')
    const [isRoleActive, setIsRoleActive] = useState<boolean>(false)
    const [isTeamActive, setIsTeamActive] = useState<boolean>(false)
    const onTextChangeAction = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onClassChangeAction = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.substring(0, 2))
    }
    return (<>
        {definedType == InputType.TEXT && (
            <input type='text' placeholder={text} value={value} onChange={canChange ? (e) => {onTextChangeAction(e)} : () => {}}/>
        )}
        {definedType == InputType.CLASS && (
            <input type='number' placeholder={text} value={value} onChange={canChange ? (e) => {onClassChangeAction(e)} : () => {}}/>
        )}
        {definedType == InputType.USER_ROLE && (<>
            {!isRoleActive && (<button value={text}></button>)}
            {isRoleActive && (
                <div>
                    <button value='Модератор'></button>
                    <button value='Заказчик'></button>
                    <button value='Исполнитель'></button>
                </div>)}
            
        </>)}
        {definedType == InputType.USER_TEAM && (<>
            {isTeamActive && (
                <div>

                </div>
            )}
        </>)}
        
    </>)
}