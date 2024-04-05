'use client'

import { FC } from 'react'
import styles from './Button.module.css'

interface IButton {
	className: string
	bgColor: string
	fgColor: string
	text: string
	action: () => Promise<void>
}

const Button: FC<IButton> = ({ className, bgColor, fgColor, text, action }) => {
	return (
		<button
			className={styles.button + ', ' + className}
			style={{ backgroundColor: bgColor, color: fgColor }}
			onClick={async () => {
				await action()
			}}
		>
			{text}
		</button>
	)
}

export default Button
