'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import { permanentRedirect } from 'next/navigation'
import styles from './page.module.css'
import { SideBar } from '@/components/main/SideBar/SideBar'
import { useEffect } from 'react'
import { checkJWTAndRedirect } from '@/functions/checkJWTAndRedirect'
import { getAccessToken } from '@/functions/jwt'
import { redirectToPage } from '@/functions/redirectToPage'
import Link from 'next/link'

export default function Dashboard() {
	const createTaskAction = async () => {
		redirectToPage('https://forms.gle/aevQapAyVCtDbPsSA')
	}
	const bodyStyle={
		overflow: 'hidden',
		display: 'flex',
		
	}
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
				<Link href='/dashboard/2'> Переход по ссылке</Link>
				<TasksContainer />	
			</main>
			<SideBar></SideBar>
		</div>
	)
}
