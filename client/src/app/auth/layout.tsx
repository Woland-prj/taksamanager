import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import styles from './layout.module.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className={styles.main}>
			<div className={styles.taksa}>
				<img src='/taksa.svg' />
			</div>
			<div className={styles.curve}>
				<div className={styles.imgBefore} />
				<img src='/curve.svg' />
				<div className={styles.imgAfter} />
			</div>
			<div className={styles.text}>
				<h1>Такса</h1>
				<h2>рада вам</h2>
			</div>
			<div className={styles.content}>{children}</div>
		</main>
	)
}
