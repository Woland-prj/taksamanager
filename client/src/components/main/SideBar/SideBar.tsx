'use client'
import { redirectToPage } from '@/functions/redirectToPage'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import styles from './SideBar.module.css'
import { SideBarButton } from './SideBarButton/SideBarButton'

export const SideBar = () => {
	return (
		<div className={styles.menu_toggle}>
			<input type='checkbox' />
			<span></span>
			<span></span>
			<span></span>
			<ul className={styles.sideBar}>
				<li className={styles.nav_item}>
					<ProfileComponent />
				</li>
				<li className={styles.nav_item}>
					<SideBarButton
						iconName='dashboard.svg'
						text='Доска задач'
						action={async () => {
							console.log('кнопка')
							redirectToPage('/dashboard')
						}}
					/>
				</li>
				<li className={styles.nav_item}>
					<SideBarButton
						iconName='team.svg'
						text='Команда'
						action={async () => {
							console.log('кнопка')
							redirectToPage('/dashboard/team')
						}}
					/>
				</li>
			</ul>
		</div>
	)
}
