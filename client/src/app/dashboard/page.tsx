'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import TasksContainer from '@/components/main/TasksContainer/TasksContainer'
import styles from './page.module.css'
import { ITask, TaskType, createTaskURL } from '@/types/tasks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TaskOption, getTasks } from '@/functions/getTasks'
import { Status } from '@/types/login_and_register'
import { TUser } from '@/types/user'
import { getUser } from '@/functions/userOperations'
import { refreshWithThrow } from '@/functions/refreshWithThrow'

export default function Dashboard() {
  const router = useRouter()
  const [viewingUser, setViewingUser] = useState<TUser | null>(null)
  const getViewingUser = async () => {
    const user = await getUser()
    setViewingUser(await user ? user : null)
    if (viewingUser == null) {
      throw Status.FORBIDDEN
    }
  }

  const [executedTasks, setExecutedTasks] = useState<ITask[] | null>(null)
  const getExecuted = async () => {
    let tasksDb = await getTasks(TaskOption.EXECUTED)
    if (!tasksDb) tasksDb = await getTasks(TaskOption.EXECUTED)
    // console.log(tasksDb)
    setExecutedTasks(tasksDb)
  }
  const fetchData = async () => {
      try {
        getViewingUser()
        getExecuted()
      }
      catch {
        try {
          refreshWithThrow()
          getViewingUser()
          getExecuted()
        }
        catch {router.replace('/auth/login')}
      }
  }
  useEffect(() => {fetchData()}, [])
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
      <div className={styles.scrollbar}>
        <TasksContainer tasks={executedTasks} />
      </div>
    </main>
  )
}
