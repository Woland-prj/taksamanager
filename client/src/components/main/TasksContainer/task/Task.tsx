import { FC } from "react";
import { Tag, TagOption } from "./Tag.tsx/Tag";
import styles from './Task.module.css'

type TTaskProps = {
    taskText: string
    deadlineDate: string
    type: TagOption
    state: TagOption
}
export const Task: FC<TTaskProps> = ({taskText, deadlineDate, type, state}) => {
    return (
        <div className={styles.task}>
            <span className={styles.taskText}>{taskText}</span>
            <div className={styles.tags}>
                <Tag option={TagOption.DEADLINE} date={deadlineDate}></Tag>
                <div className={styles.undertag}>
                    <Tag className={styles.state_tag} option={state}></Tag>
                    <Tag option={type}></Tag>
                </div>
            </div>
        </div>
    )
}