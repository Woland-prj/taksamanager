import { Status } from '@/types/login_and_register'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './ResultField.module.css'

type TResultFieldProps = {
	placeholder: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
	status: Status | null
	isEmpty?: boolean
}

export const ResultField: FC<TResultFieldProps> = ({
	placeholder,
	value,
	setValue,
	status,
	isEmpty
}) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const classes = cn(
		isActive && styles.active,
		(status === Status.FORBIDDEN || isEmpty) && styles.error,
		styles.field
	)
	return (
		<input
			className={classes}
			onFocus={() => setIsActive(true)}
			onBlur={() => {
				if (!value) setIsActive(false)
			}}
			onChange={e =>
				setValue(() => {
					return e.target.value
				})
			}
			value={value}
			placeholder={placeholder}
			type='text'
		/>
	)
}
