'use client'
import Image from "next/image"
import Button from "../ui/Button/Button"
import { useRouter } from "next/router"
import styles from './error404.module.css'
export const Error404 = () => {
    const router = useRouter()
    return (
        <div className={styles.errorContainer}>
            <Image src='/error404.svg' alt='error404' width='1480' height='400'/>
            <Button
                text='Вернуться на главную'
                action={async () => {router.replace('/dashboard')}}
                bgColor='#363636'
                fgColor="#FFFFFF"
                borderColor="#363636" 
            />
        </div>
    )
}