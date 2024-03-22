import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })
const euclidRegular = localFont({
	src: '../fonts/EuclidCircularBRegular.ttf',
	display: 'swap'
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
			<body className={euclidRegular.className}>{children}</body>
		</html>
	)
}
