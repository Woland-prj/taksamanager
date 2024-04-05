import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import { permanentRedirect } from 'next/navigation'
import styles from './page.module.css'
import { SideBar } from '@/components/main/SideBar/SideBar'

export default function Dashboard() {
	const createTaskAction = async () => {
		'use server'
		permanentRedirect('https://forms.gle/aevQapAyVCtDbPsSA')
	}
	const bodyStyle={
		overflow: 'hidden',
		display: 'flex',
		
	}
	return (
		<div style={bodyStyle}> {/* Накостылял style
		потому что по-другому отключение полосы прокрутки
		не работает*/}
			<SideBar></SideBar>
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
		</div>
	)
}
