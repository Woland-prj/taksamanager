import { TaskOption, getAllTasks, getTasks } from "@/functions/getTasks"
import { refreshWithThrow } from "@/functions/refreshWithThrow"
import { getUser } from "@/functions/userOperations"
import { Status } from "@/types/login_and_register"
import { ITask, TaskStatus } from "@/types/tasks"
import { TUser, UserRole } from "@/types/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import TasksContainer from "../TasksContainer/TasksContainer"
import styles from "./TasksTable.module.css"

export const TasksTable = () => {
  const router = useRouter()
  const [viewingUser, setViewingUser] = useState<TUser | null>(null)
  const getViewingUser = async () => {
    const user: TUser = await getUser()
    setViewingUser(user ? user : null)
  }
  const [appointedDoneTasks, setAppointedDoneTasks] = useState<ITask[] | null>(null)        // CLIENT
  const [appointedNotDoneTasks, setAppointedNotDoneTasks] = useState<ITask[] | null>(null)

  const [executedDoneTasks, setExecutedDoneTasks] = useState<ITask[] | null>(null)          // EXECUTOR
  const [executedNotDoneTasks, setExecutedNotDoneTasks] = useState<ITask[] | null>(null)

  const [moderatedTasks, setModeratedTasks] = useState<ITask[] | null>(null)    // ADMIN

  const [allTasks, setAllTasks] = useState<ITask[] | null>(null)    // ROOT

  const getClient = async () => {
    let doneTasks: ITask[] = []
    let notDoneTasks: ITask[] = []
    const tasksDb = await getTasks(TaskOption.APPOINTED)
    tasksDb?.map(task => {
      if (task.status == TaskStatus.VERIFYCOMPLETED) doneTasks.push(task)
      else {notDoneTasks.push(task)}
    })
    setAppointedDoneTasks(doneTasks)
    setAppointedNotDoneTasks(notDoneTasks)
  }

  const getExecutor = async () => {
    let doneTasks: ITask[] = []
    let notDoneTasks: ITask[] = []
    const tasksDb = await getTasks(TaskOption.EXECUTED)
    tasksDb?.map(task => {
      if (task.status == TaskStatus.VERIFYCOMPLETED) doneTasks.push(task)
      else {notDoneTasks.push(task)}
    })
    setExecutedDoneTasks(doneTasks)
    setExecutedNotDoneTasks(notDoneTasks)
  }
  const getAdminAndRoot = async (userRole: string) => {
    const tasksDb = await getAllTasks()
    const moderatedTasks: ITask[] = []
    const allTasks: ITask[] = []
    tasksDb?.map(task => {
      if (
        task.status != TaskStatus.VERIFYCOMPLETED
        && task.status != TaskStatus.REJECTEDBYLEAD
        && task.status != TaskStatus.REJECTED
        && task.status != TaskStatus.EXPIRED
      ) {
        moderatedTasks.push(task)
      }
      if (userRole == UserRole.ROOT) {
        allTasks.push(task)
      }
    })
    setModeratedTasks(moderatedTasks)
    setAllTasks(allTasks)
  }
  const fetchData = async () => {
      try {
        await getViewingUser()
        await getClient()
        if (viewingUser?.role != UserRole.CLIENT) {
          await getExecutor()
          if (viewingUser?.role != UserRole.EXECUTOR) {
            await getAdminAndRoot(viewingUser?.role ? viewingUser?.role : UserRole.ADMIN)
          }
        }
      }
      catch {
        try {
          await refreshWithThrow()
          await getViewingUser()
          await getClient()
          if (viewingUser?.role != UserRole.CLIENT) {
            await getExecutor()
            if (viewingUser?.role != UserRole.EXECUTOR) {
              await getAdminAndRoot(viewingUser?.role ? viewingUser?.role : UserRole.ADMIN)
            }
          }
        }
        catch {
          router.replace('/auth/login')
        }
      }
  }


  useEffect(() => {fetchData()}, [])
    return (
      <div className={styles.tasksTable}>
        <div className={styles.container}>
        {(viewingUser?.role == UserRole.ADMIN || viewingUser?.role == UserRole.ROOT) && 
          moderatedTasks != null && moderatedTasks.length != 0 && (
          <div className={styles.table}>
            <span className={styles.title}>Модерируемые задачи</span>
            <TasksContainer tasks={moderatedTasks}/>
          </div>
        )}
        
        {(viewingUser?.role == UserRole.EXECUTOR || 
          viewingUser?.role == UserRole.ROOT || 
          viewingUser?.role == UserRole.ADMIN) && (
          <>
            {executedNotDoneTasks != null && executedNotDoneTasks.length != 0 && (
              <div className={styles.table}>
                <span className={styles.title}>Выполняемые вами задачи</span>
                <TasksContainer tasks={executedNotDoneTasks}/>
              </div>
            )}
            {executedDoneTasks != null && executedDoneTasks.length != 0 && (
              <div className={styles.table}>
                <span className={styles.title}>Выполненные вами задачи</span>
                <TasksContainer tasks={executedDoneTasks}/>
              </div>
            )}  
          </>
        )}

        {appointedNotDoneTasks != null && appointedNotDoneTasks.length != 0 && (
          <div className={styles.table}>
            <span className={styles.title}>Назначенные вами задачи</span>
            <TasksContainer tasks={appointedNotDoneTasks}/>
          </div>
        )}
        {appointedDoneTasks != null && appointedDoneTasks.length != 0 && (
          <div className={styles.table}>
            <span className={styles.title}>Ваши выполненные задачи</span>
            <TasksContainer tasks={appointedDoneTasks}/>
          </div>
        )}
        {viewingUser?.role == UserRole.ROOT && allTasks != null && allTasks.length != 0 && (
              <div className={styles.table}>
                <span className={styles.title}>Все задачи</span>
                <TasksContainer tasks={allTasks}/>
              </div>
            )}
        </div>
      </div>
    )
}