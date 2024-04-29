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
	fontColor?: string
	backgroundColor?: string
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
	fontColor,
	backgroundColor,
}) => {
	const buttonCn = cn(euclid500.className, styles.button, buttonClassName)

	const title = !sectionTitle ? '' : sectionTitle
	const definedButtonText = !buttonText ? '' : buttonText
	const fgColor = fontColor ? fontColor : '#FFFFFF'
	const bgColor = backgroundColor ? backgroundColor : '#545454'
	return (
		<div className={styles.header}>
			<h1 className={cn(styles.section_name, textClassName)}>{title}</h1>
			<Button
				className={buttonCn}
				fgColor={fgColor}
				bgColor={bgColor}
				text={definedButtonText}
				action={async () => {
					await buttonAction()
				}}
			/>
		</div>
	)
}
