'use client'

import Button from '@/components/ui/Button/Button'
import { FC } from 'react'
import styles from './PageHeader.module.css'

interface IPageHeader {
	sectionTitle: string
	buttonText: string
	buttonAction: () => Promise<void>
}

export const PageHeader: FC<IPageHeader> = ({
	sectionTitle,
	buttonText,
	buttonAction
}) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.section_name}>{sectionTitle}</h1>
			<Button
				fgColor={'#000000'}
				bgColor={'#ffffff'}
				text={buttonText}
				action={async () => {
					await buttonAction()
				}}
			/>
		</div>
	)
}
