'use client'
import { TaskOption, getTasks, getUserTasks } from '@/functions/getTasks'
import { refreshJWT } from '@/functions/jwt'
import { ITask, TaskStatus } from '@/types/tasks'
import { FC, useEffect, useState } from 'react'
import styles from './TasksContainer.module.css'
import { Task } from './task/Task'
import { renewQuestionTemplates } from '@/functions/renewQuestionTemplates'
import { useRouter } from 'next/navigation'
import { TaskType } from '@/types/tasks'

type TTaskContainerProps = {
	statusFilter?: TaskStatus   // Параметр по которому фильтруются задачи по статусу. При отсутствии на выходе будут все задачи
	userId?: string				// Параметр, по которому мы получим задачи конкретного пользователя
	optionFilter?: TaskOption   // Параметр по которому мы фильтруются задачи в статусе EXECUTED и APPOINTED. При отсутствии выдаст все задачи
}

const TasksContainer: FC<TTaskContainerProps> = ({statusFilter, userId, optionFilter}) => {
	const router = useRouter()
	const definedUserId = userId ? userId : null
	const option = optionFilter ? optionFilter : TaskOption.EXECUTED
	const [tasks, setTasks] = useState<ITask[] | null>(null)
	const exampleTask = {
		id: '1',
		name: 'Имя',
		status: TaskStatus.INWORK,
		deadline: new Date('12/12/12'),
		type: TaskType.POST,
		questions: []
	}
    const getAllUserTasks = async () => {
		try {
			refreshJWT()
			if (definedUserId) {
				setTasks(await getUserTasks(definedUserId))
			} else {	
				setTasks(await getTasks(option))
			}
		}
		catch {
			//console.log('renew refresh token') 
			router.replace('/auth/login')
		}
    }
  	useEffect(() => {renewQuestionTemplates(); getAllUserTasks()}, [])
	return (
		<div className={styles.blockContainer}>
			<div className={styles.tasksContainer}>
				{tasks?.map(task => { 
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
