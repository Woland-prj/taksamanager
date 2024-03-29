'use client'

import { getTasks } from '@/functions/getTasks'
import { getAccessToken } from '@/functions/jwt'
import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'

const TasksContainer = () => {
	const [tasks, setTasks] = useState<ITask[] | null>(null)

	useEffect(() => {
		const getExecuted = async () => {
			const token = getAccessToken()
			try {
				const tasks = await getTasks(token)
				setTasks(tasks)
				console.log(tasks)
			} catch (status) {
				if (status == Status.FORBIDDEN) console.log('renew token')
			}
		}

		getExecuted()
	}, [])
	return <div></div>
}

export default TasksContainer
