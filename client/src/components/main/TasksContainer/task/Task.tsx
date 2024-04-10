import { FC } from "react";
import { Tag, TagOption } from "./tag/Tag";
import styles from './Task.module.css'
import { Status } from "@/types/login_and_register";
type TTaskProps = {
    taskText: string
    deadlineDate: Date
    taskType: string
    status: string
    executorId?: string
    executorName?: string
    clientId?: string
    clientName?: string
}
export const Task: FC<TTaskProps> = ({taskText, deadlineDate, taskType, status}) => {
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