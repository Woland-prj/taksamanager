import { redirectToPage } from '@/functions/redirectToPage'
import { TUser } from '@/types/user'
import { FC } from 'react'
import styles from './TeamContainer.module.css'
import UserBlock from './UserBlock/UserBlock'

const TeamContainer: FC<{ users: TUser[] }> = ({ users }) => {
	return (
		<div className={styles.container}>
			{users.map(user => (
				<UserBlock
					key={user.id}
					user={user}
					clickAction={() => redirectToPage(`/dashboard/user/${user.id}`)}
				/>
			))}
		</div>
	)
}

export default TeamContainer
