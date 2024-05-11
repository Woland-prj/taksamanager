import UserBlock from '@/components/main/TeamContainer/UserBlock/UserBlock'
import { getAllUsers } from '@/functions/getAllUsers'
import { Status } from '@/types/login_and_register'
import { TUser, UserRole } from '@/types/user'
import cn from 'clsx'
import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import styles from './ExecutorSelection.module.css'

import { changeTaskByAdmin } from '@/functions/taskOperations'
import { TaskStatus } from '@/types/tasks'

type TExecutorSelectionProps = {
	className: string
	taskId: string
}
const euclid400 = localFont({
	src: [
		{
			path: '../../../../../fonts/EuclidCircularBLight.ttf',
			weight: '400'
		}
	]
})
export const ExecutorSelection: FC<TExecutorSelectionProps> = ({
	className,
	taskId
}) => {
	const [users, setUsers] = useState<TUser[] | null>(null)
	const router = useRouter()
	const fetchUsers = async () => {
		try {
			const valUsers: TUser[] = []
			let users = await getAllUsers()
			if (!users) users = await getAllUsers()
			if (users) {
				users.forEach(user => {
					if (user.role === UserRole.ADMIN || user.role === UserRole.EXECUTOR)
						valUsers.push(user)
				})
				setUsers(valUsers)
			}
		} catch (status) {
			if (status == Status.FORBIDDEN) router.replace('/auth/login')
			if (status == Status.NOTFOUND) router.replace('/dashboard')
		}
	}
	useEffect(() => {
		fetchUsers()
	}, [])
	return (
		<div className={cn(className, styles.menu)}>
			<span className={euclid400.className}>Выбери исполнителя</span>
			{users &&
				users.map(user => (
					<UserBlock
						user={user}
						clickAction={async () => {
							await changeTaskByAdmin(taskId, TaskStatus.WAITCONSENT, user.id)
							location.reload()
						}}
					/>
				))}
		</div>
	)
}
