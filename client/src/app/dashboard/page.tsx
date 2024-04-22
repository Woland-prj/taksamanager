'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import styles from './page.module.css'
import { SideBar } from '@/components/main/SideBar/SideBar'
import { useEffect, useLayoutEffect } from 'react'
import { refreshJWT } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'

export default function Dashboard() {
	const createTaskAction = async () => {
		redirectToPage('https://forms.gle/aevQapAyVCtDbPsSA')
	}
	useEffect(() => {
		try {
			refreshJWT()
			console.log('refreshJWT()')
		}
		catch {
			redirectToPage('auth/login')
		}
	})
	return (
		<div className={styles.container}>
			<main className={styles.workingField}>
				<header>
					<PageHeader
						sectionTitle='Доска задач'
						buttonText='Создать задачу'
						buttonAction={createTaskAction}
					/>
				</header>
				<TasksContainer />	
			</main>
			<SideBar></SideBar>
		</div>
	)
}
