import Image from "next/image"
import { FC } from "react"
import styles from './ProfileComponent.module.css'
type TProfileComponentProps = {
    imageName: string
    username: string
	action: () => Promise<void>}
export const ProfileComponent: FC<TProfileComponentProps> = ({
    imageName,
    username,
    action
}) => {
    return (
        <div className={styles.profile}>
            <Image
                className={styles.image}
                src={'/' + imageName}
                alt='/taksa.png'
                width='20'
                height='20'
            />
            <h2 className={styles.username}>{username}</h2>
        </div>
    )
}