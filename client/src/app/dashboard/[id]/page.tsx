'use client'
import { TaskInfo } from "@/components/main/TaskInfo/TaskInfo";
import redirectByJWT from "@/functions/redirectByJWT";


export default function TaskPage() {
	redirectByJWT()
    return (<>
        <TaskInfo></TaskInfo>
    </>)
}