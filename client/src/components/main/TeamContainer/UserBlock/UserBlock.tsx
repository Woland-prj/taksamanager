import { TUser } from "@/types/user";
import Image from "next/image";
import styles from '../TeamContainer.module.css'
import cn from 'clsx'

const UserBlock: React.FC<{ user: TUser }> = ({ user }) => {
  return (
    <div className={styles.user_block}>
      <Image className={cn(user.avatar ? styles.user_avatar : null)} src={user.avatar ? user.avatar : '/default_avatar.svg'} alt={user.username} width={40} height={40} />
      <div className={styles.text_container}>
        <span>{user.username}</span>
        <div className={styles.class_team_container}>
          {user.class && <span>{user.class} класс</span>}
          {user.teamId && <>
            <span>Команда:</span>
            <div className={styles.team_color} style={{ backgroundColor: user.teamColor }} />
          </>}
        </div>
      </div>
    </div>
  )
}

export default UserBlock
