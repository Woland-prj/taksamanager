'use client'

import UserCard from '@/components/UserCard/UserCard'
import { getUser, getUserById } from "@/functions/userOperations"
import { Status } from "@/types/login_and_register"
import { TUser } from "@/types/user"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserPage() {
  const router = useRouter()
  const userId = usePathname().substring('/dashboard/team/'.length)
  const [user, setUser] = useState<TUser | null>(null)
  const [currUser, setCurrUser] = useState<TUser | null>(null)
  const fetchCurrUser = async () => {
    try {
      let user = await getUser()
      if (!user) user = await getUser()
      if (user) setCurrUser(user)
    } catch (status) {
      if (status == Status.FORBIDDEN) router.replace('/auth/login')
      if (status == Status.NOTFOUND) router.replace('/dashboard')
    }
  }
  const fetchUser = async () => {
    try {
      let user = await getUserById(userId)
      if (!user) user = await getUserById(userId)
      if (user) setUser(user)
    } catch (status) {
      if (status == Status.FORBIDDEN) router.replace('/auth/login')
      if (status == Status.NOTFOUND) router.replace('/dashboard')
    }
  }
  useEffect(() => {
    fetchUser()
    fetchCurrUser()
  }, [])
  return (
    <main>
      {user && <UserCard user={user} updaterRole={currUser ? currUser.role : null} />}
    </main>
  )
}
