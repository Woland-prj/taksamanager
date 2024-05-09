'use client'
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import styles from './ProfileComponent.module.css'
import { Status } from "@/types/login_and_register"
import { getUser } from "@/functions/userOperations"
import { TUser } from "@/types/user"
import { refreshJWT } from "@/functions/jwt"
import { useRouter } from "next/navigation"
import { refreshWithThrow } from "@/functions/refreshWithThrow"
type TProfileComponentProps = {
  action: () => Promise<void>
}
export const ProfileComponent: FC<TProfileComponentProps> = ({
  action
}) => {

  const [username, setUsername] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const router = useRouter()
  const getName = async () => {
    try {
      const user: TUser = await getUser()
      setUsername(user.username)
      setAvatar(user.avatar)
    }
    catch (status) {
      if (status == Status.FORBIDDEN) {
        try { refreshWithThrow() }
        catch { router.replace('/auth/login') }
      }
    }
  }
  useEffect(() => { getName() }, [])
  return (
    <div className={styles.profile}>
      <Image
        className={styles.image}
        src={avatar ? avatar : '/default_avatar.svg'}
        alt='avatar'
        width={30}
        height={30}
      />
      <h2 className={styles.username}>{username}</h2>
    </div>
  )
}
