'use client'

import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './field.module.scss'

export interface IField {
	name: string
	placeholder: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
}

const Field: FC<IField> = ({ name, placeholder, value, setValue }) => {
	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<>
			<div className={styles.field}>
				<input
					name={name}
					onFocus={() => setIsActive(true)}
					onBlur={() => {
						if (!value) setIsActive(false)
					}}
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
				<label
					className={cn(isActive ? styles.focusedLabel : null)}
					htmlFor={name}
				>
					{placeholder}
				</label>
			</div>
		</>
	)
}

export default Field
