'use client'

import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './field.module.css'

export interface IField {
	name: string
	placeholder: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
	type: '' | 'email'
}

const Field: FC<IField> = ({ name, placeholder, value, setValue }) => {
	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<>
			<div>
				<input
					className={styles.field}
					name={name}
					onFocus={() => setIsActive(true)}
					onBlur={() => {
						if (!value) setIsActive(false)
					}}
					onChange={e => setValue(e.target.value)}
					value={value}
					placeholder={placeholder}
					type={type}
					onInput={() => checkValidationOfType(type)}
				/>
				{/* <label
					className={cn(isActive ? styles.focusedLabel : null)}
					htmlFor={name}
				>
					{placeholder}
				</label> */}
			</div>
		</>
	)
}

export default Field
