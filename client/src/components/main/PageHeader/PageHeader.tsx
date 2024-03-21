import Button, { ButtonType } from '@/components/form/button/button'
import { FC } from 'react'
import styles from './PageHeader.module.css'

interface IPageHeader {
	sectionTitle: string
	buttonText: string
	buttonAction: () => void
}

export const PageHeader: FC<IPageHeader> = ({
	sectionTitle,
	buttonText,
	buttonAction
}) => {
	return (
		<div className={styles.header}>
			<h1>{sectionTitle}</h1>
			<Button
				type={ButtonType.COLORED}
				text={buttonText}
				action={buttonAction}
			/>
		</div>
	)
}
