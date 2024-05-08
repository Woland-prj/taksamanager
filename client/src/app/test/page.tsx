'use client'
import TasksContainer from "@/components/main/TasksContainer/TasksContainer"
import { getAllTasks } from "@/functions/getTasks"
import { refreshWithThrow } from "@/functions/refreshWithThrow"
import { Status } from "@/types/login_and_register"
import { ITask } from "@/types/tasks"
import { useEffect, useState } from "react"

export default function testPage() {
    const [allTasks, setAllTasks] = useState<ITask[] | null>(null)
    const getTasks = async () => {
        try {
            const tasks = await getAllTasks()
            setAllTasks(tasks)
            console.log(tasks)
        }
        catch {throw Status.FORBIDDEN}
    }
    const fetchData = async () => {
        try {await getTasks()}
        catch { 
            try {await refreshWithThrow(); await getTasks()}
            catch {}
        }
    }
    useEffect(() => {fetchData()}, [])
    return(
        <div>
            <TasksContainer tasks={allTasks}/>
        </div>
    )
}