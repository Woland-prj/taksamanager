'use client'

import { TLoggingInUser } from '@/types/login_and_register'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Status } from '../LogInForm'
import styles from './field.module.css'

export interface IField {
	name: string
	placeholder: string
	value: string
	setValue: Dispatch<SetStateAction<TLoggingInUser>>
	status: Status
	fieldType: 'password' | 'email' | 'username'
}

const Field: FC<IField> = ({
	name,
	placeholder,
	value,
	setValue,
	fieldType
}) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const classes = cn(styles.field, styles.error)

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
			{/* <label
				className={cn(isActive ? styles.focusedLabel : null)}
				htmlFor={name}
			>
				{placeholder}
			</label> */}
		</div>
	)
}

export default Field
