import { SideBar } from '@/components/main/SideBar/SideBar'
import styles from './layout.module.css'
export default function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className={styles.container}>
			{children}
			<SideBar></SideBar>
		</div>
	)
}
