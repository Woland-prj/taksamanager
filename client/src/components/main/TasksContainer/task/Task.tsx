import { FC, useEffect, useState } from "react";
import { Tag } from "./tag/Tag";
import styles from './Task.module.css'
import { stringToTagOption } from "@/functions/stringToTagOption";
import { ITask, TagOption } from "@/types/tasks";
import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/functions/userOperations";
import { TUser, UserRole } from "@/types/user";
import { refreshWithThrow } from "@/functions/refreshWithThrow";
import { useRouter } from "next/navigation";
import { convertTaskStatus } from "@/functions/convertTaskStatus";
import { refreshJWT } from "@/functions/jwt";
import { Status } from "@/types/login_and_register";

// type TTaskProps = {
//     taskId: string
//     taskText: string
//     deadlineDate: Date
//     taskType: string
//     taskStatus: string
//     executorId?: string
//     executorName?: string
//     clientId?: string
//     clientName?: string
// }

// TODO: Реализовать просмотр задачи в зависмости от статуса пользователя (клиент, админ/исполнитель)
export const Task: FC<{ task: ITask, user: TUser | null }> = ({ task, user }) => {
  const router = useRouter()
  const type = stringToTagOption(task.type)
  const [tagOption, setTagOption] = useState<TagOption | null>(null) //stringToTagOption(task.status)
  const deadline = task.deadline.toString().substring(0, 10)
  const textAddition = task.executorName ? '- ' : 'ищется...'
  const executorLink = task.executorId
    ? '/userpage/' + task.executorId
    : '/dashboard'
  
  const defineTagOption = async () => {
    const userRole = user ? user?.role : UserRole.CLIENT
    setTagOption(stringToTagOption(convertTaskStatus(task.status, userRole)))
  }
  const fetchData = async () => {
    try {
      await defineTagOption();
    } catch {
      try {
        console.log('Task');
        await refreshJWT();
        await defineTagOption();
      } catch {
        router.replace('/auth/login');
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className={styles.task}>
      <Link href={'dashboard/' + task.id} className={styles.link}>
        <span className={styles.taskText}>{task.name}</span>
      </Link>
      <div className={styles.taskInfo}>
        <div className={styles.info}>
          <Image src='/person.svg' width='21' height='21' alt=''></Image>
          <span>
            Исполнитель {textAddition}
            <Link
              href={executorLink}
              className={styles.link}
            >
              {task.executorName}
            </Link>
          </span>
        </div>
        <div className={styles.info}>
          <Image src='/calendar.svg' width='21' height='21' alt=''></Image>
          <span>Выполнить до {deadline}</span>
        </div>
        <div className={styles.tags}>
          <Tag className={styles.stateLayout} option={tagOption}></Tag>
          <Tag option={type}></Tag>
        </div>
      </div>
    </div>
  )
}
