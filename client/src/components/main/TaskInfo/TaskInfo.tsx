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
    const taskId = usePathname().substring(11)

    const [task, setTask] = useState<ITask | null>(null)
    const getTask = async () => {
        console.log('token')
        try {
            console.log('token')
            const token = getAccessToken()
            console.log(token)
            const taskDb = await getTaskbyId(taskId, token)
            console.log(taskDb)
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