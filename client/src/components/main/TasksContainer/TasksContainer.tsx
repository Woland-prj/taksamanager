'use client'

import { getTasks } from '@/functions/getTasks'
import { getAccessToken } from '@/functions/jwt'
import { Status } from '@/types/login_and_register'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'
import styles from './TasksContainer.module.css'

const TasksContainer = () => {
  const [tasks, setTasks] = useState<ITask[] | null>(null)
  const REMOVE_AFTER_TESTS_STYLE = {
    height: '3000px'
  }

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
      Слово
      <div style={REMOVE_AFTER_TESTS_STYLE}></div>
    </div>
  )
}

export default TasksContainer
