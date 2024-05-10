import { TUpdateUser, TUser, UserClass, UserRole } from '@/types/user'
import styles from './UserCard.module.css'
import { useEffect, useState } from 'react'
import CardTextField from './CardTextField/CardTextField'
import { CardFieldType, CardMode } from './types'
import CardListField from './CardListField/CardListField'
import CardColorField from './CardColorField/CardColorField'
import { classOptions, convertClassToEnum, roleOptions } from '@/data/users'
import CardPictureField from './CardPictureField/CardPictureField'
import { changeUserInfoById } from '@/functions/userOperations'
import CardButton from './CardButton'

type UserCardProps = {
  user: TUser,
  updaterRole?: UserRole | null
}

const getCardMode = (updaterRole: UserRole | null | undefined) => {
  switch (updaterRole) {
    case undefined:
      return CardMode.UPDATE_SELF
    case UserRole.ADMIN:
      return CardMode.UPDATE_ADMIN
    default:
      return CardMode.VIEW
  }
}

const updateHandler = async (e: any, id: string, updateUser: TUpdateUser) => {
  e.preventDefault()

}

// Если updaterRole = undefined, то карточка обновляется текущим пользователем
const UserCard: React.FC<UserCardProps> = ({ user, updaterRole }) => {
  const mode = getCardMode(updaterRole)
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
            fieldName="avatar"
            changeable={mode !== CardMode.VIEW}
          />
          {mode != CardMode.VIEW &&
            <CardButton text={'Сохранить изменения'} action={async () => await changeUserInfoById(user.id, updateUser)} />
          }
        </div>
        <div className={styles.user_info}>
          <CardTextField
            type={CardFieldType.PLAIN}
            placeholder={user.username}
            setData={setUpdateUser}
            fieldName="username"
            changeable={mode != CardMode.VIEW}
          />
          <CardListField<UserClass>
            label="Класс:"
            type={CardFieldType.INLINE}
            placeholder={convertClassToEnum(user.class).toString()}
            setData={setUpdateUser}
            fieldName="class"
            changeable={mode === CardMode.UPDATE_ADMIN}
            options={classOptions}
          />
          <CardTextField
            label="Привязка к телеграмму:"
            type={CardFieldType.BLOCK}
            placeholder={'@' + user.tgUsername}
            setData={setUpdateUser}
            fieldName="tgUsername"
            changeable={mode != CardMode.VIEW}
          />
          <CardTextField
            label="Привязка к почте:"
            type={CardFieldType.BLOCK}
            placeholder={user.email}
            setData={setUpdateUser}
            fieldName="email"
            changeable={false}
          />
          <CardListField<UserRole>
            label="Роль:"
            type={CardFieldType.INLINE}
            placeholder={user.role}
            setData={setUpdateUser}
            fieldName="role"
            changeable={mode === CardMode.UPDATE_ADMIN}
            options={roleOptions}
          />
          <CardColorField
            label="Команда:"
            type={CardFieldType.INLINE}
            placeholder={user.teamColor}
            setData={setUpdateUser}
            fieldName="teamColor"
            changeable={mode === CardMode.UPDATE_ADMIN}
          />
        </div>

      </form>
    </div>
  )
}

export default UserCard
