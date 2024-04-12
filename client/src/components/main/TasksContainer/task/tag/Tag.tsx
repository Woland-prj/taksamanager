import { FC } from "react"
import styles from './Tag.module.css'
import Image from "next/image"
import cn from 'clsx'
import { TagOption } from "@/types/tasks"


type TTagProps = {option: TagOption, date?: Date, width?: string, className?: string } 

export const Tag: FC<TTagProps> = ({option, date, className}) => {
    let tagClassName: string = ''
    let src: string = ''
    let text: string = ''
    const layoutClassName = styles.layout

    return (
        <div className={cn(tagClassName, className, layoutClassName)}>
            <Image src={src} alt='' width='21' height='20'/>
            {text}
        </div>
    )
}