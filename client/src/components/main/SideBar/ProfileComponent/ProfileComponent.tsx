'use client'
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import styles from './ProfileComponent.module.css'
import { Status } from "@/types/login_and_register"
import { getUser } from "@/functions/userOperations"
import { TUser } from "@/types/user"
import { refreshJWT } from "@/functions/jwt"
import { useRouter } from "next/navigation"
type TProfileComponentProps = {
    imageName: string
	action: () => Promise<void>}
export const ProfileComponent: FC<TProfileComponentProps> = ({
    imageName,
    action
}) => {

    const [username, setUsername] = useState<string>('')
    const router = useRouter()
    const getName = async () => {
        try {
            const user: TUser = await getUser()
            setUsername(user.username)
        }
        catch (status) {
            if (status == Status.FORBIDDEN) {
                try {refreshJWT()}
                catch {router.replace('/auth/login')}
            }
        }
    }
    useEffect(() => {getName()}, [])
    return (
        <div className={styles.profile}>
            <Image
                className={styles.image}
                src={'/' + imageName}
                alt='/taksa.png'
                width='20'
                height='20'
            />
            <h2 className={styles.username}>{username}</h2>
        </div>
    )
}