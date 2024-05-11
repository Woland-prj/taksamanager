'use client'
import UserCard from '@/components/UserCard/UserCard'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import PlainPageHeader from '@/components/ui/PlainPageHeader/PlainPageHeader'
import { TaskOption, getTasks } from '@/functions/getTasks'
import { getUser, getUserById } from '@/functions/userOperations'
import { Status } from '@/types/login_and_register'
import { ITask, TaskStatus } from '@/types/tasks'
import { TUser, UserRole } from '@/types/user'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './UserPage.module.css'

const UserPage = () => {
	const router = useRouter()
	const userId = usePathname().substring('/dashboard/user/'.length)
	const [user, setUser] = useState<TUser | null>(null)
	const [currUser, setCurrUser] = useState<TUser | null>(null)
	const [userTasks, setUserTasks] = useState<{
		executedTasks: ITask[]
		doneTasks: ITask[]
		failedTasks: ITask[]
	}>({
		executedTasks: [],
		doneTasks: [],
		failedTasks: []
	})
	const fetchCurrUser = async () => {
		try {
			let user = await getUser()
			if (!user) user = await getUser()
			if (user) setCurrUser(user)
		} catch (status) {
			if (status == Status.FORBIDDEN) router.replace('/auth/login')
			if (status == Status.NOTFOUND) router.replace('/dashboard')
		}
	}
	const fetchUser = async () => {
		try {
			let user = await getUserById(userId)
			if (!user) user = await getUserById(userId)
			if (!user) router.replace('/404')
			if (user) setUser(user)
		} catch (status) {
			if (status == Status.FORBIDDEN) router.replace('/auth/login')
			if (status == Status.NOTFOUND) router.replace('/dashboard')
		}
	}
	const getExecuted = async () => {
		const tasksDb = await getTasks(TaskOption.EXECUTED)
		console.log(tasksDb)
		const doneTasks: ITask[] = []
		const failedTasks: ITask[] = []
		const executedTasks: ITask[] = []
		tasksDb?.forEach(task => {
			console.log(task.executorId, user?.id)
			if (task.executorId == user?.id) {
				console.log(task)
				if (task.status == TaskStatus.VERIFYCOMPLETED) {
					doneTasks.push(task)
				} else if (task.status == TaskStatus.EXPIRED) {
					failedTasks.push(task)
				} else if (
					task.status == TaskStatus.INWORK ||
					task.status == TaskStatus.COMPLETED
				) {
					executedTasks.push(task)
				}
			}
		})
		setUserTasks({
			executedTasks: executedTasks,
			doneTasks: doneTasks,
			failedTasks: failedTasks
		})
	}

	useEffect(() => {
		fetchCurrUser()
		fetchUser()
	}, [])
	useEffect(() => {
		getExecuted()
	}, [user])
	return (
		<main className={styles.container}>
			<PlainPageHeader
				headerText={'Профиль пользователя ' + `${user?.username}`}
			/>
			<div className={styles.scrollContainer}>
				{user && currUser && <UserCard user={user} updater={currUser} />}
				{user?.role != UserRole.CLIENT && (
					<div>
						{userTasks.executedTasks.length > 0 && (
							<div>
								<span className={styles.title}>
									Задачи, выполняемые этим пользователем
								</span>
								<TasksContainer
									tasks={userTasks.executedTasks}
									role={UserRole.CLIENT}
								/>
							</div>
						)}
						{userTasks.doneTasks.length > 0 && (
							<div>
								<span>Задачи, выполненные этим пользователем</span>
								<TasksContainer
									tasks={userTasks.doneTasks}
									role={UserRole.CLIENT}
								/>
							</div>
						)}
						{userTasks.failedTasks.length > 0 && (
							<div>
								<span>Задачи, проваленные этим пользователем</span>
								<TasksContainer
									tasks={userTasks.failedTasks}
									role={UserRole.CLIENT}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</main>
	)
}

export default UserPage
