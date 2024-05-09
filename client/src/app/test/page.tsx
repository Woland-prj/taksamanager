// 'use client'
// import TasksContainer from "@/components/main/TasksContainer/TasksContainer"
// import { getAllTasks } from "@/functions/getTasks"
// import { refreshWithThrow } from "@/functions/refreshWithThrow"
// import { Status } from "@/types/login_and_register"
// import { ITask } from "@/types/tasks"
// import { useEffect, useState } from "react"
//
// export default function testPage() {
//     const [allTasks, setAllTasks] = useState<ITask[] | null>(null)
//     const getTasks = async () => {
//         try {
//             const tasks = await getAllTasks()
//             setAllTasks(tasks)
//             console.log(tasks)
//         }
//         catch {throw Status.FORBIDDEN}
//     }
// <<<<<<< HEAD
//     const token = getAccessToken()
//     const base64Avatar = await toBase64(file)
//     console.log(JSON.stringify({ avatar: base64Avatar }))
//     const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users`, {
//       method: 'PATCH',
//       credentials: 'include',
//       headers: {
//         Authorization: 'Bearer ' + `${token}`
//       },
//       body: JSON.stringify({ avatar: base64Avatar })
//     })
//     console.log(response)
//     if (response.ok) {
//       console.log('success')
//       setAvatar(base64Avatar as string)
// =======
//     const fetchData = async () => {
//         try {await getTasks()}
//         catch { 
//             try {await refreshWithThrow(); await getTasks()}
//             catch {}
//         }
// >>>>>>> client
//     }
//     useEffect(() => {fetchData()}, [])
//     return(
//         <div>
//             <TasksContainer tasks={allTasks}/>
//         </div>
//     )
// }
