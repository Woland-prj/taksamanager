import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/globals.css'
import cn from 'clsx'
import styles from './layout.module.css'

const euclidRegular = localFont({
	src: [{
		path: '../fonts/EuclidCircularBBold.ttf',
		weight: '600',
		style: 'normal',
	},
	{
		path: '../fonts/EuclidCircularBLight.ttf',
		weight: '200',
		style: 'normal'
	},
	{
		path: '../fonts/EuclidCircularBMedium.ttf',
		weight: '300',
		style: 'normal'
	},
	{
		path: '../fonts/EuclidCircularBRegular.ttf',
		weight: '400',
		style: 'normal'
	}],
	display: 'swap',
	
	variable: '--font-euclidCircular'
})

export const metadata: Metadata = {
	title: 'Taksamanager',
	description: 'Powerful task manager app for Infotech mediacenter'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={cn(euclidRegular.className, styles.body)}>{children}</body>
		</html>
	)
}
