import Image from 'next/image'
import { FC } from 'react'
import styles from './Error.module.css'

const ErrorBlock: FC<{ text: string }> = ({ text }) => {
	return (
		<div className={styles.error}>
			<Image src='/error.svg' alt='error_icon' width={40} height={35} />
			<p>{text}</p>
		</div>
	)
}

export default ErrorBlock
