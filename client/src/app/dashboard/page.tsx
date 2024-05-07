'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import styles from './page.module.css'
import { ITask, TaskType, createTaskURL } from '@/types/tasks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TaskAffilationType, getTasks } from '@/functions/getTasks'
import { Status } from '@/types/login_and_register'

export default function Dashboard() {
  const router = useRouter()
  const [executedTasks, setExecutedTasks] = useState<ITask[] | null>(null)
  const getExecuted = async () => {
    try {
      let tasksDb = await getTasks(TaskAffilationType.EXECUTED)
      if (!tasksDb) tasksDb = await getTasks(TaskAffilationType.EXECUTED)
      // console.log(tasksDb)
      setExecutedTasks(tasksDb)
    } catch (status) {
      if (status === Status.FORBIDDEN) router.push('/auth/login')
      console.log('eroroooor', status)
    }
  }
  useEffect(() => {
    getExecuted()
  }, [])
  return (
    <main className={styles.workingField}>
      <header>
        <PageHeader
          sectionTitle='Доска задач'
          buttonText='Создать задачу'
          buttonAction={async () => { }}
          href={createTaskURL}
        />
      </header>
      <TasksContainer tasks={executedTasks} />
    </main>
  )
}
