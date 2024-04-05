'use client'

import { FC } from 'react'
import styles from './PageHeader.module.css'
import Button from '@/components/ui/Button/Button'
import localFont from 'next/font/local'
import cn from 'clsx'
interface IPageHeader {
	sectionTitle: string
	buttonText: string
	buttonAction: () => Promise<void>
}

const euclid500 = localFont({
	src: [{
		path: '../../../fonts/EuclidCircularBRegular.ttf',
		weight: '500',
	}]
})
const buttonClassName = cn(euclid500.className, styles.button)

export const PageHeader: FC<IPageHeader> = ({
	sectionTitle,
	buttonText,
	buttonAction
}) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.section_name}>{sectionTitle}</h1>
			<Button
				className={buttonClassName}
				fgColor={'#FFFFFF'}
				bgColor={'#545454'}
				text={buttonText}
				action={async () => {
					await buttonAction()
				}}
			/>
		</div>
	)
}
