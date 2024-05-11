import { FC, PropsWithChildren } from 'react'
import styles from './Scrollbar.module.css'

type TScrollbarProps = {
    height?: string
}

export const Scrollbar: FC<PropsWithChildren & TScrollbarProps> = ({height, children}) => {
    const definedHeight = height ? height : '80vh'
    return (
        <div className={styles.scrollbar} style={{height: definedHeight}}>
            {children}
        </div>
    )
}