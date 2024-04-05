import type { Metadata } from 'next'
import localFont from 'next/font/local'

const euclidRegular = localFont({
	src: [{
		path: '../../fonts/EuclidCircularBBold.ttf',
		weight: '600',
		style: 'normal',
	},
	// {
	// 	path: '../../fonts/EuclidCircularBLight.ttf',
	// 	weight: '300',
	// 	style: 'normal'
	// },
	// {
	// 	path: '../../../fonts/EuclidCircularBMedium.ttf',
	// 	weight: '400',
	// 	style: 'normal'
	// },
	// {
	// 	path: '../../../fonts/EuclidCircularBRegular.ttf',
	// 	weight: '500',
	// 	style: 'normal'
	// }
],
	display: 'swap',
	
	variable: '--font-euclidCircular'
})

export const metadata: Metadata = {
	title: 'Taksamanager',
	description: 'Powerful task manager app for Infotech mediacenter'
}
export default function DashBoardLayout({
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