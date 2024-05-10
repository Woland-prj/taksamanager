import { TaskOption, getTasks } from "@/functions/getTasks"
import TasksContainer from "../TasksContainer/TasksContainer"
import styles from './User.module.css'
import { useEffect, useState } from "react"
import { ITask, TaskStatus } from "@/types/tasks"
import { TUser, UserRole } from "@/types/user"
import { getUser, getUserById } from "@/functions/userOperations"
import { usePathname } from "next/navigation"
export const User = () => {
  const [userTasks, setUserTasks] = useState<{executedTasks:ITask[], doneTasks:ITask[], failedTasks:ITask[]}>(
    {
      executedTasks: [],
      doneTasks: [],
      failedTasks: []
    }
  )
  const userId = usePathname().substring('/user/'.length)
  const [user, setUser] = useState<TUser | null>(null) // Пользователь, информация о котором отображается на странице
  const saveUser = async () => {
    const userDb = await getUserById(userId)
    setUser(userDb)
  }

  const [viewingUser, setViewingUser] = useState<TUser | null>(null) // Пользователь, просматривающий страницу
  const saveViewingUser = async () => {
    const userDb: TUser = await getUser()
    setViewingUser(userDb ? userDb : null)
  }
  
  const getExecuted = async () => {
    const tasksDb = await getTasks(TaskOption.EXECUTED)
    const doneTasks: ITask[] = []
    const failedTasks: ITask[] = []
    const executedTasks: ITask[] = []
    tasksDb?.map(task => {
      if (task.executorId == user?.id) {
        if (task.status == TaskStatus.VERIFYCOMPLETED) {doneTasks.push(task)}
        else if (task.status == TaskStatus.EXPIRED) {failedTasks.push(task)}
        else if (task.status == TaskStatus.INWORK || task.status == TaskStatus.COMPLETED) {executedTasks.push(task)}
      }
    })
    setUserTasks({executedTasks: executedTasks, doneTasks: doneTasks, failedTasks: failedTasks})
  }
  useEffect(() => {saveUser(); saveViewingUser(); getExecuted()}, [])
  return (
    <main>
      <span>Профиль пользователя</span>
      <div>
        {/* <UserCard user={user}/> */}
        {user?.role != UserRole.CLIENT && (
          <div className={styles.scrollbar}>
            {userTasks.executedTasks.length > 0 &&
              <div>
                <span>Задачи, выполняемые этим пользователем</span>
                <TasksContainer tasks={userTasks.executedTasks} role={UserRole.CLIENT}/>
              </div>
            }
            {userTasks.doneTasks.length > 0 &&
              <div>
                <span>Задачи, выполненные этим пользователем</span>
                <TasksContainer tasks={userTasks.doneTasks} role={UserRole.CLIENT}/>
              </div>
            }
            {userTasks.failedTasks.length > 0 &&
              <div>
                <span>Задачи, проваленные этим пользователем</span>
                <TasksContainer tasks={userTasks.failedTasks} role={UserRole.CLIENT}/>
              </div>
            }
          </div>
        )}
      </div>
    </main>
  )
}
