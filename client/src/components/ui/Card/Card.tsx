import { FC } from 'react'

interface ITaskCard {
	title: string
	dedline: string
	taskType: string
}
const TaskCard: FC<ITaskCard> = ({ title, dedline }) => {
	return (
		<div className='card'>
			<h3>{title}</h3>
			<div>
				<div>
					<span>Дедлайн</span>
					<span>{dedline}</span>
				</div>
			</div>
		</div>
	)
}

export default TaskCard
