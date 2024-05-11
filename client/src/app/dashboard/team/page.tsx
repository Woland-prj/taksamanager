'use client'
import TeamContainer from "@/components/main/TeamContainer/TeamContainer"
import PlainPageHeader from "@/components/ui/PlainPageHeader/PlainPageHeader"
import { getAllUsers } from "@/functions/getAllUsers"
import { TUser } from "@/types/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from './TeamPage.module.css'

export default function TeamPage() {
  const router = useRouter()
  const [team, setTeam] = useState<TUser[]>([])
  const getTeam = async () => {
    try {
      let users = await getAllUsers()
      if (!users) users = await getAllUsers()
      console.log(users)
      if (users) setTeam(users)
    } catch (status) {
      router.replace('/auth/login')
    }
  }
  useEffect(() => {
    getTeam()
  }, [])
  return (
    <>
      <div className={styles.container}>
        <PlainPageHeader headerText='Команда Таксы' />
        <TeamContainer users={team} />
      </div>
    </>
  )
}
