import { classOptions, convertClassToEnum, roleOptions } from '@/data/users'
import { changeUserInfoById } from '@/functions/userOperations'
import { TUpdateUser, TUser, UserClass, UserRole } from '@/types/user'
import { useEffect, useState } from 'react'
import CardButton from './CardButton'
import CardColorField from './CardColorField/CardColorField'
import CardListField from './CardListField/CardListField'
import CardPictureField from './CardPictureField/CardPictureField'
import CardTextField from './CardTextField/CardTextField'
import styles from './UserCard.module.css'
import { CardFieldType, CardMode } from './types'

type UserCardProps = {
	user: TUser
	updater: TUser
}

const getCardMode = (user: TUser, updater: TUser) => {
	let res: CardMode = CardMode.VIEW
	if (user.id == updater.id) res = CardMode.UPDATE_SELF
	if (updater.role == UserRole.ADMIN) res = CardMode.UPDATE_ADMIN
	return res
}

// Если updaterRole = undefined, то карточка обновляется текущим пользователем
const UserCard: React.FC<UserCardProps> = ({ user, updater }) => {
	const mode = getCardMode(user, updater)
	const [updateUser, setUpdateUser] = useState<TUpdateUser>({})
	useEffect(() => {
		console.log(updateUser)
	}, [updateUser])
	return (
		<div className={styles.user_card}>
			<form>
				<div className={styles.avatar_block}>
					<CardPictureField
						placeholder={user.avatar}
						setData={setUpdateUser}
						fieldName='avatar'
						changeable={mode !== CardMode.VIEW}
					/>
					{mode != CardMode.VIEW && (
						<CardButton
							text={'Сохранить изменения'}
							action={async () => await changeUserInfoById(user.id, updateUser)}
						/>
					)}
				</div>
				<div className={styles.user_info}>
					<CardTextField
						type={CardFieldType.PLAIN}
						placeholder={user.username}
						setData={setUpdateUser}
						fieldName='username'
						changeable={mode != CardMode.VIEW}
					/>
					<CardListField<UserClass>
						label='Класс:'
						type={CardFieldType.INLINE}
						placeholder={convertClassToEnum(user.class).toString()}
						setData={setUpdateUser}
						fieldName='class'
						changeable={mode === CardMode.UPDATE_ADMIN}
						options={classOptions}
					/>
					<CardTextField
						label='Привязка к телеграмму:'
						type={CardFieldType.BLOCK}
						placeholder={'@' + user.tgUsername}
						setData={setUpdateUser}
						fieldName='tgUsername'
						changeable={mode != CardMode.VIEW}
					/>
					<CardTextField
						label='Привязка к почте:'
						type={CardFieldType.BLOCK}
						placeholder={user.email}
						setData={setUpdateUser}
						fieldName='email'
						changeable={false}
					/>
					<CardListField<UserRole>
						label='Роль:'
						type={CardFieldType.INLINE}
						placeholder={user.role}
						setData={setUpdateUser}
						fieldName='role'
						changeable={mode === CardMode.UPDATE_ADMIN}
						options={roleOptions}
					/>
					<CardColorField
						label='Команда:'
						type={CardFieldType.INLINE}
						placeholder={user.teamColor}
						setData={setUpdateUser}
						fieldName='teamColor'
						changeable={mode === CardMode.UPDATE_ADMIN}
					/>
				</div>
			</form>
		</div>
	)
}

export default UserCard
