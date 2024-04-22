'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import styles from './page.module.css'
import { SideBar } from '@/components/main/SideBar/SideBar'
import { redirectToPage } from '@/functions/redirectToPage'

export default function Dashboard() {
	const createTaskAction = async () => {
		redirectToPage('https://forms.gle/aevQapAyVCtDbPsSA')
	}
	return (
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
	)
}
