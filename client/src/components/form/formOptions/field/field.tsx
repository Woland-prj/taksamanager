'use client'

import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './field.module.css'
import cn from 'clsx'

export interface IField {
	name: string
	placeholder: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
	isThereAnyError: boolean
	// type: '' | 'email'
}

const Field: FC<IField> = ({ name, placeholder, value, setValue, isThereAnyError }) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const classes = cn(styles.field, styles.error && isThereAnyError)

	return (
		<div>
			<input
				className={classes}
				name={name}
				onFocus={() => setIsActive(true)}
				onBlur={() => {
					if (!value) setIsActive(false)
				}}
				onChange={e => setValue(e.target.value)}
				value={value}
				placeholder={placeholder}
				// type={type}
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
