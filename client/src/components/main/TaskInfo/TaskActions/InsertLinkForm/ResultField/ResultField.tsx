import { Status } from "@/types/login_and_register"
import { Dispatch, FC, SetStateAction, useState } from "react"
import cn from 'clsx'
import styles from './ResultField.module.css'

type TResultFieldProps = {
    placeholder: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    status: Status | null,
    isEmpty?: boolean,
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
		styles.field,
		isActive && styles.active,
		(status === Status.FORBIDDEN || isEmpty) &&
			styles.error
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
					})}
				value={value}
				placeholder={placeholder}
				type='text'
			/>
    )
}