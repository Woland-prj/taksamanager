'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import styles from './page.module.css'
import { redirectToPage } from '@/functions/redirectToPage'
import redirectByJWT from '@/functions/redirectByJWT'

export const createTaskURL = 'https://forms.gle/aevQapAyVCtDbPsSA'

export default function Dashboard() {
	// const createTaskAction = async () => {
	// 	redirectToPage('https://forms.gle/aevQapAyVCtDbPsSA')
	// }
	redirectByJWT()
	return (
		<main className={styles.workingField}>
			<header>
				<PageHeader
					sectionTitle='Доска задач'
					buttonText='Создать задачу'
					buttonAction={async () => {}}
					href={createTaskURL}
				/>
			</header>
			<TasksContainer />	
		</main>
	)
}
