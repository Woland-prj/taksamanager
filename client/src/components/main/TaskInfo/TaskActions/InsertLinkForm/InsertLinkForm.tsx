import Button from "@/components/ui/Button/Button"
import { IForm, Status } from "@/types/login_and_register"
import { SetStateAction, useState } from "react"
import { ResultField } from "./ResultField/ResultField"
import styles from './InsertLinkForm.module.css'

export const InsertLinkForm = () => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
	const [formData, setFormData] = useState<string>('')
	const [status, setStatus] = useState<Status | null>(null)

	const isNotEmpty = (data: string): boolean => {
		setStatus(null)
		if (data == '') {
			return false
		}
		return true
	}
    return (
        <div className={styles.form}>
            <ResultField
                placeholder="Введите ссылку или адрес выполненной работы"
                value={formData}
                setValue={setFormData}
                status={status}  
                isEmpty={isEmpty}       
            />
            <Button
                text='Подтвердить выполнение работы'
                action={async () => {
                    if (isNotEmpty(formData)) {
                        setIsEmpty(false)
                        try {
                            
                        } catch (status) {
                            if (status === Status.FORBIDDEN) {
                                setStatus(Status.FORBIDDEN)
                            }
                        }
                    } else {
                        setIsEmpty(true)
                    }
                }}
                bgColor="#363636"
                fgColor="#FFFFFF"
                borderColor="#363636"
                className={styles.button}
            />
        </div>
    )
}