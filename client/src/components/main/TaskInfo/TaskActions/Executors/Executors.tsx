'use client'
import { getUserById } from '@/functions/userOperations'
import styles from './Executors.module.css'
import { TUser } from '@/types/user'
import { getTaskbyId } from '@/functions/getTaskbyId'
import { usePathname } from 'next/navigation'
import { ITask } from '@/types/tasks'
import { FC, useEffect, useState } from 'react'
import localFont from 'next/font/local'
import cn from 'clsx'
import Image from 'next/image'


export const Executors = () => {
    const taskId = usePathname().substring('/dashboard/'.length)
    const [user, setUser] = useState<TUser | null>(null)
    const saveUser = async (id: string) => {

        const undefinedUserId: string | undefined = ((await getTaskbyId(id)) as ITask).executorId
        const userId = undefinedUserId ? undefinedUserId : 'noId'
        setUser(await getUserById(userId))
    }
    
    const userClass = 11        // На время отсутствия в api необходимой информации
    const teamColor = '#FF0000' // константы содержат тестовые данные
    useEffect(() => {saveUser(taskId)}, [])
    return (
        <>
            <div className={styles.executor}>
                <Image className={styles.image} src='/no_avatar.svg' alt='' height={50} width={50}/> {/*TODO: надо сделать добавление изображения пользователя*/} 
                <div className={styles.executor_info}>
                    <span className={styles.text}>{user?.username}</span>
                    <div className={styles.additional_data}>
                        <span className={styles.text}>Класс {userClass}</span>
                        <div className={styles.team}>
                            <span className={styles.text}>Команда</span>
                            <div className={styles.square} style={{backgroundColor: teamColor}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}