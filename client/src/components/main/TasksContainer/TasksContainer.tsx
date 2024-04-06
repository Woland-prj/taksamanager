'use client'
import { firstTask } from './tests/minTest'
import { getTasks } from '@/functions/getTasks'
import { getAccessToken } from '@/functions/jwt'
import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'
import styles from './TasksContainer.module.css'
import { Task } from './task/Task'

const TasksContainer = () => {
	const [tasks, setTasks] = useState<ITask[] | null>(null)

  useEffect(() => {
    const getExecuted = async () => {
      const token = getAccessToken()
      console.log(token)
      try {
        const tasksDb = await getTasks(token)
        console.log(tasksDb)
        setTasks(tasksDb)
      } catch (status) {
        console.log(status)
        if (status == Status.FORBIDDEN) console.log('renew token')
      }
    }

		getExecuted()
	}, [])
	return (
		<div className={styles.tasksContainer}>
			<Task taskText={firstTask.taskText}
				deadlineDate={firstTask.deadlineDate}
				state={firstTask.state}
				type = {firstTask.type}
			/>
		</div>
	)
}

export default TasksContainer
