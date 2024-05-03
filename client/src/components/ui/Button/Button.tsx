'use client'
import cn from 'clsx'
import { FC } from 'react'
import styles from './Button.module.css'
import localFont from 'next/font/local'

interface IButton {
	className?: string
	borderColor?: string
	bgColor: string
	fgColor: string
	text: string
	action: () => Promise<void>
	isSelectable?: boolean
}

const euclid500 = localFont({
	src: [{
		path: '../../../fonts/EuclidCircularBRegular.ttf',
		weight: '500',
	}]
})

const Button: FC<IButton> = ({ className, bgColor, fgColor, borderColor, text, action, isSelectable }) => {
	const userSelect = isSelectable ? 'text' : 'none'
	const buttonCn = className ? className : ''
	const border = borderColor ? borderColor : fgColor
	return (
		<button
			className={cn(styles.button, buttonCn, euclid500.className)}
			style={{ 
				backgroundColor: bgColor,
				color: fgColor,
				border: '1px solid ' + border,
				userSelect: userSelect
			}}
			onClick={async () => {
				await action()
			}}
		>
			{text}
		</button>
	)
}

export default Button
