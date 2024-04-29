'use client'
import cn from 'clsx'
import { FC } from 'react'
import styles from './Button.module.css'

interface IButton {
	className?: string
	borderColor?: string
	bgColor: string
	fgColor: string
	text: string
	action: () => Promise<void>
}

const Button: FC<IButton> = ({ className, bgColor, fgColor, borderColor, text, action }) => {
	const buttonCn = className ? className : ''
	const border = borderColor ? borderColor : fgColor
	return (
		<button
			className={cn(styles.button, buttonCn)}
			style={{ backgroundColor: bgColor, color: fgColor, borderColor: border }}
			onClick={async () => {
				await action()
			}}
		>
			{text}
		</button>
	)
}

export default Button
