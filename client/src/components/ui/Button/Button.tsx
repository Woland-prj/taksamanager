'use client'

import { FC } from 'react'
import styles from './Button.module.css'

interface IButton {
	bgColor: string
	fgColor: string
	text: string
	action: () => Promise<void>
}

const Button: FC<IButton> = ({ bgColor, fgColor, text, action }) => {
	return (
		<button
			className={styles.button}
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
