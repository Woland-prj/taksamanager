'use client'
import { TaskType, getTasks } from '@/functions/getTasks'
import { getAccessToken, refreshJWT } from '@/functions/jwt'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'
import styles from './TasksContainer.module.css'
import { Task } from './task/Task'
type TasksContainerProps = {
  tasks: ITask[] | null
}

const TasksContainer: React.FC<TasksContainerProps> = ({ tasks }) => {
  return (
    <div className={styles.blockContainer}>
      <div className={styles.tasksContainer}>
        {tasks?.map(task => {
          return (
            <Task task={task} key={task.id} />
          )
        })}
      </div>
    </div>
  )
}

export default TasksContainer
