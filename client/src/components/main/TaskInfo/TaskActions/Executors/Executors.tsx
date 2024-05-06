'use client'
import { getUserById } from '@/functions/userOperations'
import styles from './Executor.module.css'
import { TUser } from '@/types/user'
import { getTaskbyId } from '@/functions/getTaskbyId'
import { usePathname } from 'next/navigation'
import { ITask } from '@/types/tasks'
import { useEffect, useState } from 'react'
import { Executor } from './Executor/Executor'


export const Executors = () => {
    const taskId = usePathname().substring('/dashboard/'.length)
    const [user, setUser] = useState<TUser | null>(null)
    const saveUser = async (id: string) => {

        const undefinedUserId: string | undefined = ((await getTaskbyId(id)) as ITask).executorId
        const userId = undefinedUserId ? undefinedUserId : 'noId'
        setUser(await getUserById(userId))
    }
    
    useEffect(() => {saveUser(taskId)}, [])
    return (
        <Executor user={user}/>
    )
}