import { TaskStatus } from '@/types/tasks'
import { FC } from 'react'

interface ITag {
	status: TaskStatus
	text: string
}

const Tag: FC<ITag> = ({ status, text }) => {
	return <div></div>
}

export default Tag
