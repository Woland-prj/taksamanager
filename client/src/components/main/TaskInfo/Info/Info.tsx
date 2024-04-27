import { FC } from "react";
import styles from './Info.module.css'
type TInfoProps = {
    title: string,
    text: string,
}

export const Info: FC<TInfoProps> = ({title, text}) => {
    return (
        <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <p className={styles.text}>{text}</p>
        </div>
    )
}