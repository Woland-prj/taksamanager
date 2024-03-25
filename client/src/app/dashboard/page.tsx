import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import { permanentRedirect } from 'next/navigation'

export default function Dashboard() {
	const createTaskAction = async () => {
		'use server'
		permanentRedirect('https://forms.gle/aevQapAyVCtDbPsSA')
	}
	return (
		<main>
			<header>
				<PageHeader
					sectionTitle='Доска задач'
					buttonText='Создать задачу'
					buttonAction={createTaskAction}
				/>
			</header>
		</main>
	)
}