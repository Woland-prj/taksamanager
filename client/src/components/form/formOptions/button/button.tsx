import cn from 'clsx'
import { FC } from 'react'
import styles from './button.module.css'

export enum ButtonType {
	PLAIN = 'PLAIN',
	COLORED = 'COLORED',
}

interface IButton {
	type: ButtonType
	text: string
	action: () => void
}

const Button: FC<IButton> = ({ type, text, action }) => {
	return (
		<button
			className={cn(
				styles.button,
				type == ButtonType.PLAIN ? styles.plain : styles.colored
			)}
			onClick={action}
		>
			{text}
		</button>
	)
}

export default Button
