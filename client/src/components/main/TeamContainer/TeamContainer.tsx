import { TUser } from "@/types/user"
import UserBlock from "./UserBlock/UserBlock"
import { FC } from "react"
import styles from './TeamContainer.module.css'

const TeamContainer: FC<{ users: TUser[] }> = ({ users }) => {
  return (
    <div className={styles.container}>
      {
        users.map(user => <UserBlock key={user.id} user={user} />)
      }
    </div>
  )
}

export default TeamContainer
