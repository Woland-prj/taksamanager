import { FC } from "react";
import { Tag} from "./tag/Tag";
import styles from './Task.module.css'
import { stringToTagOption } from "@/functions/stringToTagOption";
import { TagOption } from "@/types/tasks";
type TTaskProps = {
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
export const Task: FC<TTaskProps> = ({taskText, deadlineDate, taskType, taskStatus}) => {
    const type = stringToTagOption(taskType)
    const status = stringToTagOption(taskStatus)
    return (
        <div className={styles.task}>
            <span className={styles.taskText}>{taskText}</span>
            <div className={styles.tags}>
                <Tag option={TagOption.DEADLINE} date={deadlineDate}></Tag>
                <div className={styles.undertag}>
                    <Tag className={styles.state_tag} option={status}></Tag>
                    <Tag option={type}></Tag>
                </div>
            </div>
        </div>
    )
}