import { createTaskURL } from '@/types/tasks'
import { redirectToPage } from './redirectToPage'
export const redirectToTaskForm = async () => {
	redirectToPage(createTaskURL)
}
