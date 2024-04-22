'use client'
import { TaskType, getTasks } from '@/functions/getTasks'
import { getAccessToken, refreshJWT } from '@/functions/jwt'
import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'
import styles from './TasksContainer.module.css'
import { Task } from './task/Task'
import { redirectToPage } from '@/functions/redirectToPage'


const TasksContainer = () => {
	const [executedTasks, setExecutedTasks] = useState<ITask[] | null>(null)

  useEffect(() => {
    const getExecuted = async () => {
		try {
		const token = getAccessToken()
		console.log(token)
		const tasksDb = await getTasks(token, TaskType.EXECUTED)
		console.log(tasksDb)
		setExecutedTasks(tasksDb)
		}
		catch (status) {
			console.log('renew token') 
			redirectToPage('http://localhost:3000/auth/login')
		}
    } 

	try {
		getExecuted()
	}
	catch (status) {
		console.log(status)
		if (status == Status.FORBIDDEN) {
			console.log('renew token') 
			redirectToPage('http://localhost:3000/auth/login')
		}
		else console.log('Something unforseen happened.')
		}
	}, [])
	return (
		<div className={styles.blockContainer}>
			<div className={styles.tasksContainer}>
				{executedTasks?.map(task => { 
					return (
						<Task 
							key={task.id}
							taskId={task.id}
							taskText={task.name}
							deadlineDate={task.deadline}
							taskStatus={task.status}
							taskType = {task.type}
							executorId={task.executorId}
							executorName={task.executorName}
							clientId={task.clientId}
							clientName={task.clientName}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default TasksContainer
