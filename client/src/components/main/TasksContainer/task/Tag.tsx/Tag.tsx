import { FC } from "react"
import styles from './Tag.module.css'
import Image from "next/image"

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
type TTagProps = {option: TagOption, date?: string } 

export const Tag: FC<TTagProps> = ({option, date}) => {
    let className: string = ''
    let src: string = ''
    let text: string = ''
    
    if(option == TagOption.TYPE_POST )
    {
        className = styles.typeTag
        src = '../../../../../public/post.png'
        text = 'Пост'
    }
    if(option == TagOption.TYPE_DESIGN )
    {
        className = styles.typeTag
        src = '../../../../../public/design.png'
        text = 'Дизайн'
    }
    if(option == TagOption.TYPE_VIDEO )
    {
        className = styles.typeTag
        src = '../../../../../public/video.png'
        text = 'Видео'
    }
    if(option == TagOption.TYPE_MONTAGE )
    {
        className = styles.typeTag
        src = '../../../../../public/montage.png'
        text = 'Монтаж'
    }
    if(option == TagOption.TYPE_PHOTO )
    {
        className = styles.typeTag
        src = '../../../../../public/photo.png'
        text = 'Фото'
    }
    if(option == TagOption.STATE_FREE) {
        className = styles.freeTag
        src = '../../../../../public/free.png'
        text = 'Свободно'
    }
    if(option == TagOption.STATE_INWORK) {
        className = styles.inworkTag
        src = '../../../../../public/inwork.png'
        text = 'В работе'
    }
    if(option == TagOption.STATE_EXPIRED) {
        className = styles.expiredTag
        src = '../../../../../public/expired.png'
        text = 'Просрочено'
    }
    if(option == TagOption.STATE_DONE) {
        className = styles.doneTag
        src = '../../../../../public/done.png'
        text = 'Выполнено'
    }
    if(option == TagOption.DEADLINE) {
        className = styles.deadlineTag
        src = '../../../../../public/deadline.png'
        text = 'Выполнить до' + date
    }
    return (
        <div className={className}>
            <Image src={src} alt=''/>
            {text}
        </div>
    )
}