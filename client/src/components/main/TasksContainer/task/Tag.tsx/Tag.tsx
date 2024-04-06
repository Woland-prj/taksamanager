import { FC } from "react"
import styles from './Tag.module.css'
import Image from "next/image"
import cn from 'clsx'


export enum TagOption {
    TYPE_POST = 'TYPE_POST',
    TYPE_DESIGN = 'TYPE_DESIGN',
    TYPE_VIDEO = 'TYPE_VIDEO',
    TYPE_MONTAGE = 'TYPE_MONTAGE',
    TYPE_PHOTO = 'TYPE_PHOTO',

    STATE_FREE = 'STATE_FREE',
    STATE_INWORK = 'STATE_INWORK',
    STATE_EXPIRED = 'STATE_EXPIRED',
    STATE_DONE = 'STATE_DONE',

    DEADLINE = 'DEADLINE',
}
type TTagProps = {option: TagOption, date?: string, width?: string, className?: string } 

export const Tag: FC<TTagProps> = ({option, date, className}) => {
    let tagClassName: string = ''
    let src: string = ''
    let text: string = ''
    const layoutClassName = styles.layout

    if(option == TagOption.TYPE_POST )
    {
        tagClassName = styles.typeTag
        src = '/post.png'
        text = 'Пост'
    }
    if(option == TagOption.TYPE_DESIGN )
    {
        tagClassName = styles.typeTag
        src = '/design.png'
        text = 'Дизайн'
    }
    if(option == TagOption.TYPE_VIDEO )
    {
        tagClassName = styles.typeTag
        src = '/video.png'
        text = 'Видео'
    }
    if(option == TagOption.TYPE_MONTAGE )
    {
        tagClassName = styles.typeTag
        src = '/montage.png'
        text = 'Монтаж'
    }
    if(option == TagOption.TYPE_PHOTO )
    {
        tagClassName = styles.typeTag
        src = '/photo.png'
        text = 'Фото'
    }
    if(option == TagOption.STATE_FREE) {
        tagClassName = styles.freeTag
        src = '/free.png'
        text = 'Свободно'
    }
    if(option == TagOption.STATE_INWORK) {
        tagClassName = styles.inworkTag
        src = '/inwork.png'
        text = 'В работе'
    }
    if(option == TagOption.STATE_EXPIRED) {
        tagClassName = styles.expiredTag
        src = '/expired.png'
        text = 'Просрочено'
    }
    if(option == TagOption.STATE_DONE) {
        tagClassName = styles.doneTag
        src = '/done.png'
        text = 'Выполнено'
    }
    if(option == TagOption.DEADLINE) {
        tagClassName = styles.deadlineTag
        src = '/deadline.png'
        text = 'Выполнить до ' + date
    } 
    return (
        <div className={cn(tagClassName, className, layoutClassName)}>
            <Image src={src} alt='' width='21' height='20'/>
            {text}
        </div>
    )
}