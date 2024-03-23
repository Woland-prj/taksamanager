import { ITask } from '@/types/tasks'
import { FC } from 'react'

interface ITaskCard extends Pick<ITask, 'name' | 'deadline' | 'status'> {}

const TaskCard: FC<ITaskCard> = ({ name, deadline, status }) => {
	return (
		<div className='card'>
			<h3>{name}</h3>
			<div>
				<div>
					<span>Дедлайн</span>
					<span>{deadline.getDate()}</span>
				</div>
			</div>
		</div>
	)
}

export default TaskCard
