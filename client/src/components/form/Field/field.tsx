'use client'

import { IForm, Status } from '@/types/login_and_register'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './field.module.css'

export interface IField {
	name: string
	placeholder: string
	value: string
	setValue: Dispatch<SetStateAction<IForm>>
	status: Status | null
	fieldType: 'password' | 'email' | 'username'
	isEmpty?: boolean,
	className?: string,
}

const Field: FC<IField> = ({
	name,
	placeholder,
	value,
	setValue,
	fieldType,
	status,
	isEmpty,
	className,
}) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const classes = cn(
		styles.field,
		isActive && styles.active,
		(status === Status.FORBIDDEN ||
			status === Status.BADREQUEST ||
			status === Status.EXIST ||
			isEmpty) &&
			styles.error,
		className
	)

	return (
		<div>
			<input
				className={classes}
				name={name}
				onFocus={() => setIsActive(true)}
				onBlur={() => {
					if (!value) setIsActive(false)
				}}
				onChange={e =>
					setValue(prev => {
						return { ...prev, [fieldType]: e.target.value }
					})
				}
				value={value}
				placeholder={placeholder}
				type={fieldType}
				// onInput={() => checkValidationOfType(type)}
			/>
		</div>
	)
}

export default Field
