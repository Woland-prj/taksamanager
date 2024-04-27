import Image from "next/image"
import { FC } from "react"
import styles from './SideBarButton.module.css'

type TSideBarButtonProps = {
    iconName: string
    text: string
    
	action: () => Promise<void>
}

export const SideBarButton: FC<TSideBarButtonProps> = ({iconName, text, action}) => {
    return (
        <div className={styles.button} onClick={action}>
            <Image
                className={styles.image}
                src={'/' + iconName}
                alt=''
                width='21'
                height='20'
            />
            <div className={styles.text}>{text}</div>
        </div>
    )
}