'use client'
import { PageHeader } from "@/components/main/PageHeader/PageHeader"
import TeamContainer from "@/components/main/TeamContainer/TeamContainer"
import { getAllUsers } from "@/functions/getAllUsers"
import redirectByJWT from "@/functions/redirectByJWT"
import { TUser } from "@/types/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
    <TeamContainer users={team} />
  )
}
