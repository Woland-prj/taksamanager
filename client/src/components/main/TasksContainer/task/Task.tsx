import { FC } from "react";
import { Tag} from "./tag/Tag";
import styles from './Task.module.css'
import { stringToTagOption } from "@/functions/stringToTagOption";
import { TagOption } from "@/types/tasks";
import Link from "next/link";
type TTaskProps = {
    taskId: string
    taskText: string
    deadlineDate: Date
    taskType: string
    taskStatus: string
    executorId?: string
    executorName?: string
    clientId?: string
    clientName?: string
}
// TODO: Реализовать просмотр задачи в зависмости от статуса пользователя (клиент, админ/исполнитель)
export const Task: FC<TTaskProps> = ({
    taskId,
    taskText,
    deadlineDate,
    taskType,
    taskStatus,
    executorId,
    executorName,
    clientId,
    clientName
}) => {
    const type = stringToTagOption(taskType)
    const status = stringToTagOption(taskStatus)
    const deadline = deadlineDate.toString().substring(0, 10)
    const textAddition = executorName ? '- ' : 'ищется...'
    const executorLink = executorId
    ? '/userpage/' + executorId
    : '/dashboard'
    // const taskLink = type == TagOption.COMPLETED
    return (
        <div className={styles.task}>
            {/* <Link href={taskLink} className={styles.taskText}>{taskText}</Link> */}
            <div className={styles.taskInfo}>
                <div className={styles.info}>
                    {/* <Image></Image> */}
                    <span>
                        Исполнитель {textAddition}
                        <Link
                            href={executorLink}
                            className={styles.link}
                        >
                            {executorName}
                        </Link>
                    </span>
                </div>
                <div className={styles.info}>
                    {/* <Image></Image> */}
                    <span>Выполнить до {deadline}</span>
                </div>
                <div className={styles.tags}>
                    <Tag className={styles.state_tag} option={status}></Tag>
                    <Tag option={type}></Tag>
                </div>
            </div>
        </div>
    )
}