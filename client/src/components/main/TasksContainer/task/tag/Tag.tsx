import { FC } from "react"
import styles from './Tag.module.css'
import Image from "next/image"
import cn from 'clsx'
import { TagOption } from "@/types/tasks"
import { TagOptionToTagParameters } from "@/functions/TagOptionToTagProps"


type TTagProps = {option: TagOption | null, className?: string } 

export const Tag: FC<TTagProps> = ({option, className}) => {
    const { tagClassName, src, text } = TagOptionToTagParameters(option ? option : TagOption.UNDEFINED)

    return (
        <div className={cn(tagClassName, className, styles.layout)}>
            <Image src={src} alt='' width='21' height='21' color='#808080'/>
            {text}
        </div>
    )
}