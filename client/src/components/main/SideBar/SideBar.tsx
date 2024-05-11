'use client'
import { redirectToPage } from '@/functions/redirectToPage'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import styles from './SideBar.module.css'
import { SideBarButton } from './SideBarButton/SideBarButton'
import { useRouter } from 'next/navigation'

export const SideBar = () => {
	const router = useRouter()
	return (
		<div className={styles.menu_toggle}>
			<div className={styles.sideBar}>
				<ul className={styles.nav}>
					<li className={styles.nav_item}>
						<ProfileComponent />
					</li>
					<li className={styles.nav_item}>
						<SideBarButton
							iconName='dashboard.svg'
							text='Доска задач'
							action={async () => {
								redirectToPage('/dashboard')
							}}
						/>
					</li>
					<li className={styles.nav_item}>
						<SideBarButton
							iconName='team.svg'
							text='Команда'
							action={async () => {
								redirectToPage('/dashboard/team')
							}}
						/>
					</li>
				</ul>
				<div className={styles.exit}>
					<SideBarButton
						iconName='exit.svg'
						text='Выйти из аккаунта'
						action={async () => {
							// deleteAllTokens()
							router.replace('/auth/login')
						}}
					/>
				</div>
			</div>	
		</div>
	)
}
