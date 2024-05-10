'use client'
import { redirectToPage } from '@/functions/redirectToPage'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import styles from './SideBar.module.css'
import { SideBarButton } from './SideBarButton/SideBarButton'

export const SideBar = () => {
	return (
		<>
			<input type='checkbox' id='nav-trigger' className={styles.trigger} />
			<label htmlFor='nav-trigger' className={styles.label}>
				<span className={styles.hidden_nav}></span>
			</label>
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
		</>
	)
}
