'use client'
import { getTaskbyId } from '@/functions/getTaskbyId'
import { refreshJWT } from '@/functions/jwt'
import { translateTaskStatus } from '@/functions/translateTaskStatus'
import { getUser } from '@/functions/userOperations'
import { ITask } from '@/types/tasks'
import { TUser, UserRole } from '@/types/user'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '../PageHeader/PageHeader'
import { Info } from './Info/Info'
import { TaskActions } from './TaskActions/TaskActions'
import styles from './TaskInfo.module.css'
import { Scrollbar } from '@/components/Scrollbar/Scrollbar'

export const TaskInfo = () => {
  const router = useRouter()
  const path = usePathname()
  const uuidLength = 36

  const taskId = path.substring(
    '/dashboard/'.length,
    uuidLength + '/dashboard/'.length
  )
  const userRole =
    path.search('=') >= 0
      ? path.substring(path.search('=') + 1).toUpperCase()
      : null

  const [task, setTask] = useState<ITask | null>(null)
  const [jwtUserRole, setJwtUserRole] = useState<string>('')

  const saveTask = async () => {
    try {
      let taskDb = await getTaskbyId(taskId)
      if (!taskDb) taskDb = await getTaskbyId(taskId)
      console.log(taskDb)
      setTask(taskDb)
      if (!taskDb) { router.replace('/404') }
    } catch {
      console.log('Такой задачи не существует')
    }
  }
  const saveUser = async () => {
    try {
      const user = (await getUser()) as TUser
      setJwtUserRole(user.role)
    } catch {
      try {
        refreshJWT()
      } catch {
        router.replace('/auth/login')
      }
    }
  }
  const checkUserRole = () => {
    // проверка ролей полученных из JWT и находящихся в строке. При найденном несоотвествии возвращает на прошлую страницу
    if (userRole == null) {
      router.replace('/dashboard')
    }
    if (userRole == UserRole.EXECUTOR && jwtUserRole == UserRole.CLIENT) {
      router.replace('/dashboard')
    }
    if (
      (userRole == UserRole.ADMIN || userRole == UserRole.ROOT) &&
      (jwtUserRole == UserRole.CLIENT || jwtUserRole == UserRole.EXECUTOR)
    ) {
      router.replace('/dashboard')
    }
  }
  useEffect(() => {
    saveTask()
    saveUser()
    checkUserRole()
  }, [])
  return (
    <main className={styles.taskContainer}>
      <header>
        <PageHeader
          textClassName={styles.headerText}
          buttonClassName={styles.headerButton}
          backgroundColor='#FFFFFF'
          fontColor='#000000'
          sectionTitle={task?.name}
          buttonText={translateTaskStatus(task?.status)}
          buttonAction={async () => { }}
        />
      </header>
      <Scrollbar>
        <div className={styles.infoAndAction}>
          <div className={styles.infoContainer}>
            {task?.questions.map(question => {
              return (
                <Info
                  key={question.id}
                  title={question.questionText}
                  text={question.answerText}
                />
              )
            })}
          </div>
          {task && <TaskActions
            userRole={
              userRole != null
                ? (userRole as UserRole)
                : UserRole.CLIENT /* userRole устроен так, что null здесь уже не будет */
            }
            task={task}
          />}
        </div>
      </Scrollbar>
      <Image
        className={styles.taksa}
        src='/task_info_taksa.svg'
        width='840'
        height='718'
        alt=''
      />
    </main>
  )
}
