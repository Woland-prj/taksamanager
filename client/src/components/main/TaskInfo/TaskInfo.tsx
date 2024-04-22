'use client'
import { getTaskbyId } from "@/functions/getTaskbyId"
import { getAccessToken } from "@/functions/jwt"
import { ITask } from "@/types/tasks"
import { useEffect, useState } from "react"
import { PageHeader } from "../PageHeader/PageHeader"
import { Info } from "./Info/Info"
import { usePathname } from "next/navigation"

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
            setTask(await taskDb)
        }
        catch {
            console.log('Такой задачи не существует')
        }
    }
    getTask()
    return (
        <main>
            <header>
                <PageHeader
                    sectionTitle={task?.name}
                    buttonText={task?.status}
                    buttonAction={async () => {}}
                />
            </header>
            <div>
                <div>
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
        </main>
    )
}