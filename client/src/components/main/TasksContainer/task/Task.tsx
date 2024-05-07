import { FC } from "react";
import { Tag } from "./tag/Tag";
import styles from './Task.module.css'
import { stringToTagOption } from "@/functions/stringToTagOption";
import { ITask, TagOption } from "@/types/tasks";
import Link from "next/link";
import Image from "next/image";

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
export const Task: FC<{ task: ITask }> = ({ task }) => {
  const type = stringToTagOption(task.type)
  const status = stringToTagOption(task.status)
  const deadline = task.deadline.toString().substring(0, 10)
  const textAddition = task.executorName ? '- ' : 'ищется...'
  const executorLink = task.executorId
    ? '/userpage/' + task.executorId
    : '/dashboard'
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
          <Tag className={styles.stateLayout} option={status}></Tag>
          <Tag option={type}></Tag>
        </div>
      </div>
    </div>
  )
}
