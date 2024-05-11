import { TUser } from '@/types/user'
import styles from './Executor.module.css'
import Image from 'next/image'
import { Dispatch, FC, MutableRefObject, SetStateAction, useState } from 'react'
import UserBlock from '@/components/main/TeamContainer/UserBlock/UserBlock'

type TExecutorProps = {
    user: TUser,
    onClick: () => Promise<void>
}

const userClass = 11        // На время отсутствия в api необходимой информации
const teamColor = '#FF0000' // константы содержат тестовые данные
export const Executor: FC<TExecutorProps> = ({user, onClick}) => {
    return(
        <div onClick={onClick}>
            <UserBlock user={user}/>
        </div>
    )
    // const [activeStyle, setActiveStyle] = useState<'rgba(114, 255, 184, 0.3)' | '#FFFFFF'>('#FFFFFF')
    // const switchActive = () => {
    //     setIsActive(!isActive)
    //     if (isActive) {
    //         setActiveStyle('rgba(114, 255, 184, 0.3)')
    //     } else { setActiveStyle('#FFFFFF')}
    // }

    // return (
    //     <div className={styles.executor} onClick={onClick}>
    //         <Image className={styles.image} src='/no_avatar.svg' alt='' height={50} width={50}/> {/*TODO: надо сделать добавление изображения пользователя*/} 
    //         <div className={styles.executor_info}>
    //             <span className={styles.text}>{user?.username}</span>
    //             <div className={styles.additional_data}>
    //                 <span className={styles.text}>Класс {userClass}</span>
    //                 <div className={styles.team}>
    //                     <span className={styles.text}>Команда</span>
    //                     <div className={styles.square} style={{backgroundColor: teamColor}}></div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}