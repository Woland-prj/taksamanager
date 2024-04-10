'use client'
import { firstTask } from './tests/minTest'
import { TaskType, getTasks } from '@/functions/getTasks'
import { getAccessToken, refreshJWT } from '@/functions/jwt'
import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'
import styles from './TasksContainer.module.css'
import { Task } from './task/Task'
import { TagOption } from './task/tag/Tag'

const TasksContainer = () => {
	const [executedTasks, setExecutedTasks] = useState<ITask[] | null>(null)

  useEffect(() => {
	refreshJWT()
	console.log('start')
    const getExecuted = async () => {
      const token = getAccessToken()
      console.log(token)
      try {
        const tasksDb = await getTasks(token, TaskType.EXECUTED)
        console.log(tasksDb)
        setExecutedTasks(tasksDb)
      } catch (status) {
        console.log(status)
        if (status == Status.FORBIDDEN) console.log('renew token')
      }
    }

		getExecuted()
	}, [])
	return (
		<div>
			<div className={styles.tasksContainer}>
				{executedTasks?.map( task => { 
					return (
						<Task 
							key={task.id}
							taskText={task.name}
							deadlineDate={task.deadline}
							status={task.status}
							taskType={'DESIGN'}
							// type = {task.type}

							executorId={task.executorId}
							executorName={task.executorName}
							clientId={task.clientId}
							clientName={task.clientName}
						/>)
				})}
			</div>
		</div>
	)
}

export default TasksContainer
