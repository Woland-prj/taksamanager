'use client'

import { FC } from 'react'
import styles from './PageHeader.module.css'
import Button from '@/components/ui/Button/Button'
import localFont from 'next/font/local'
import cn from 'clsx'
interface IPageHeader {
	sectionTitle?: string
	buttonText?: string
	buttonAction: () => Promise<void>
	textClassName?: string
	buttonClassName?: string
}

const euclid500 = localFont({
	src: [{
		path: '../../../fonts/EuclidCircularBRegular.ttf',
		weight: '500',
	}]
})
export const PageHeader: FC<IPageHeader> = ({
	sectionTitle,
	buttonText,
	buttonAction,
	textClassName, 
	buttonClassName,
}) => {
	const buttonCn = cn(buttonClassName, euclid500.className, styles.button)

	const title = !sectionTitle ? '' : sectionTitle
	const definedButtonText = !buttonText ? '' : buttonText
	return (
		<div className={styles.header}>
			<h1 className={cn(styles.section_name, textClassName)}>{title}</h1>
			<Button
				className={buttonCn}
				fgColor={'#FFFFFF'}
				bgColor={'#545454'}
				text={definedButtonText}
				action={async () => {
					await buttonAction()
				}}
			/>
		</div>
	)
}
