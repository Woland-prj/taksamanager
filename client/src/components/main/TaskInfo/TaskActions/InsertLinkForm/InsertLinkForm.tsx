import Button from '@/components/ui/Button/Button'
import { changeTaskByExecutor } from '@/functions/taskOperations'
import { Status } from '@/types/login_and_register'
import { TaskStatus } from '@/types/tasks'
import { FC, useState } from 'react'
import styles from './InsertLinkForm.module.css'
import { ResultField } from './ResultField/ResultField'
type TInsertLinkFormProps = {
	taskId: string
}
export const InsertLinkForm: FC<TInsertLinkFormProps> = ({ taskId }) => {
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
				placeholder='Введите ссылку или адрес выполненной работы'
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
							/* При заполнении и подтверждении переводит в статус COMPLETED */
							await changeTaskByExecutor(taskId, TaskStatus.COMPLETED, formData)
							location.reload()
						} catch (status) {
							if (status === Status.FORBIDDEN) {
								setStatus(Status.FORBIDDEN)
							}
						}
					} else {
						setIsEmpty(true)
					}
				}}
				bgColor='#363636'
				fgColor='#FFFFFF'
				borderColor='#363636'
				className={styles.button}
			/>
		</div>
	)
}
