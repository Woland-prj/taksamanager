'use client'
import { getTaskbyId } from "@/functions/getTaskbyId"
import { refreshJWT } from "@/functions/jwt"
import { ITask } from "@/types/tasks"
import { useEffect, useState } from "react"
import { PageHeader } from "../PageHeader/PageHeader"
import { Info } from "./Info/Info"
import { usePathname } from "next/navigation"
import styles from './TaskInfo.module.css'
import Image from "next/image"
import { translateTaskStatus } from "@/functions/translateTaskStatus"
import { TaskActions } from "./TaskActions/TaskActions"
import { TUser, UserRole } from "@/types/user"
import { getUser } from "@/functions/userOperations"
import { useRouter } from "next/navigation"
import redirectByJWT from "@/functions/redirectByJWT"

export const TaskInfo = () => {
  const router = useRouter()
  const taskId = usePathname().substring('/dashboard/'.length)
  const [task, setTask] = useState<ITask | null>(null)
  const [userRole, setUserRole] = useState<string>('')
  const [isUserExecutor, setIsUserExecutor] = useState<boolean>(false)
  const saveTask = async () => {
    try {
      let taskDb = await getTaskbyId(taskId)
      if (!taskDb) taskDb = await getTaskbyId(taskId)
      console.log(taskDb)
      setTask(taskDb)
    } catch { console.log('Такой задачи не существует') }
  }
  const saveUser = async () => {
    try {
      const user = (await getUser()) as TUser
      setIsUserExecutor(task?.executorId == user?.id)
      setUserRole(user.role)
    } catch {
      try { refreshJWT() }
      catch { router.push('/auth/login') }
    }
  }
  useEffect(() => { saveTask(); saveUser() }, [])
  return (
    <main className={styles.taskContainer}>
      <header>
        <PageHeader
          textClassName={styles.headerText}
          buttonClassName={styles.headerButton}
          backgroundColor="#FFFFFF"
          fontColor="#000000"
          sectionTitle={task?.name}
          buttonText={translateTaskStatus(task?.status)}
          buttonAction={async () => { }}
        />
      </header>
      <div className={styles.infoAndAction}>
        <div className={styles.infoContainer}>
          {task?.questions.map((question) => {
            return (
              <Info
                key={question.id}
                title={question.questionText}
                text={question.answerText}
              />
            )
          })}
        </div>
        <TaskActions
          taskStatus={task?.status}
          userRole={userRole as UserRole}
          isUserExecutor={isUserExecutor}
          taskId={taskId}
        />
      </div>
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
