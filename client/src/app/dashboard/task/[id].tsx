'use server'
import { getTaskbyId } from "@/functions/getTaskbyId"
import { TaskType, getTasks } from "@/functions/getTasks"
import { getAccessToken } from "@/functions/jwt"
import { Status } from "@/types/login_and_register"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"


export default function ExecutedTaskPage() {
    const router = useRouter()
    return (
        <div>
            <h1>TaskPage {router.query.id}</h1>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const token = getAccessToken()
    const appointedTasks = await getTasks(token, TaskType.APPOINTED)

    const paths = appointedTasks.map((task) => ({ params: { id: task.id },}
    ))

    return {
        paths,
        fallback: false
    }

}

// export const getStaticProps: GetStaticProps = async (id: string) => {
//     const token = getAccessToken() 
//     try {const task = await getTaskbyId(id, token); return {props: {task}} satisfies GetStaticProps}
//     catch (status) {
//         if (status === Status.FORBIDDEN) {console.log('renew token')}
//         else console.log('There is no task with this ID')
//     }
// }
