'use client'
import { getTaskbyId } from "@/functions/getTaskbyId"
import { getAccessToken } from "@/functions/jwt"
import { ITask } from "@/types/tasks"
import { useEffect, useLayoutEffect, useState } from "react"
import { PageHeader } from "../PageHeader/PageHeader"
import { Info } from "./Info/Info"
import { usePathname } from "next/navigation"
import styles from './TaskInfo.module.css'
import Image from "next/image"

export const TaskInfo = () => {
    const taskId = usePathname().substring('/dashboard/'.length)
    const [task, setTask] = useState<ITask | null>(null)
    const getTask = async () => {
        try {
            const token = getAccessToken()
            const taskDb = await getTaskbyId(taskId, token)
            setTask(taskDb)
        }
        catch {
            console.log('Такой задачи не существует')
        }
    }
    useEffect(() => {getTask()}, [])
    return (
        <main className={styles.taskContainer}>
            <header>
                <PageHeader
                    textClassName={styles.headerText}
                    buttonClassName={styles.headerButton}
                    backgroundColor="#FFFFFF"
                    fontColor="#000000"
                    sectionTitle={task?.name}
                    buttonText={task?.status}
                    buttonAction={async () => {}}
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
                {/* <TaskActions/> */}
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