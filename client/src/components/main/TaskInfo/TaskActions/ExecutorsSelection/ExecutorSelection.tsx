import { FC, MutableRefObject, useRef, useState } from "react"
import { Executor } from "./Executor/Executor"
import { TUser } from "@/types/user"
import localFont from "next/font/local"
import cn from 'clsx'
import styles from './ExecutorSelection.module.css'
import { changeTaskByAdmin } from "@/functions/taskOperations"
import { Status } from "@/types/login_and_register"
import { TaskStatus } from "@/types/tasks"

type TExecutorSelectionProps = {
  className: string
  taskId: string
}
const euclid400 = localFont({
  src: [{
    path: '../../../../../fonts/EuclidCircularBLight.ttf',
    weight: '400',
  }]
})
export const ExecutorSelection: FC<TExecutorSelectionProps> = ({ className, taskId }) => {
  //const executorRef: MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement>()
  const users: TUser[] = [{
    id: '1',
    username: 'Denis',
    email: 'email',
    role: 'ADMIN',
    isActivated: true,
    tgUsername: 'Osidron',
    tgChatId: 0,
    teamId: 'smth',
    teamColor: '#FF0000',
    avatar: 'smth'
  },
  {
    id: '2',
    username: 'Denis',
    email: 'email',
    role: 'ADMIN',
    isActivated: true,
    tgUsername: 'Osidron',
    tgChatId: 0,
    teamId: 'smth',
    teamColor: '#FF0000',
    avatar: 'smth'
  }]
  return (
    <div className={cn(className, styles.menu)}>
      <span className={euclid400.className}>Выбери исполнителя</span>
      {users.map((user) => (
        <Executor
          key={user.id}
          user={user}
          onClick={async () => { changeTaskByAdmin(taskId, TaskStatus.WAITCONSENT, user.id); location.reload() }}
        />
      ))}
    </div>
  )
}
