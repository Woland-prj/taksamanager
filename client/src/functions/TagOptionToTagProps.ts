import { TagOption } from '@/types/tasks'
import styles from '../components/main/TasksContainer/task/tag/Tag.module.css'

type TTagParameters = {tagClassName: string, src: string, text: string}

export const TagOptionToTagParameters = (option: TagOption, date?: string): TTagParameters => {
    switch (option){
        case TagOption.POST: return {
            tagClassName: styles.greyTag,
            src: '/post.svg',
            text: 'Пост',
        }
        case TagOption.DESIGN: return{
            tagClassName: styles.greyTag,
            src: '/design.svg',
            text: 'Дизайн',
        }
        case TagOption.VIDEO: return{
            tagClassName: styles.greyTag,
            src: '/video.svg',
            text: 'Видео',
        }
        case TagOption.MONTAGE: return {
            tagClassName: styles.greyTag,
            src: '/montage.svg',
            text: 'Монтаж',
        }
        case TagOption.PHOTO: return {
            tagClassName: styles.greyTag,
            src: '/photo.svg',
            text: 'Фото',
        }
        case TagOption.ANIMATION: return {
            tagClassName: styles.greyTag,
            src: '/animation.svg',
            text: 'Анимация',
        }
        case TagOption.WAIT_CONSENT: return {
            tagClassName: styles.yellowTag,
            src: '/wait_consent.svg',
            text: 'Назначение',
        }
        case TagOption.MODIFIED: return {
            tagClassName: styles.yellowTag,
            src: '/modified.svg',
            text: 'Модерация',
        }
        case TagOption.IN_WORK: return {
            tagClassName: styles.blueTag,
            src: '/in_work.svg',
            text: 'В работе',
        }
        case TagOption.COMPLETED: return {
            tagClassName: styles.blueTag,
            src: '/in_work.svg',
            text: 'В работе',
        }
        case TagOption.EXPIRED: return {
            tagClassName: styles.redTag,
            src: '/expired.svg',
            text: 'Просрочено',
        }
        case TagOption.VERIFY_COMPLETED: return {
            tagClassName: styles.greenTag,
            src: '/verify_completed_tag.svg',
            text: 'Выполнено'
        }
        case TagOption.REJECTED: return {
            tagClassName: styles.redTag,
            src: '/rejected.svg',
            text: 'Отклонено',
        }
        case TagOption.REJECTED_BY_ADMIN: return {
            tagClassName: styles.redTag,
            src: '/rejected.svg',
            text: 'Отклонено',
        }
        default: return {
            tagClassName: 'Класс необрабатываемого тэга',
            src: '/-',
            text: '-',
        }
    }
}

// Стили - redTag, greyTag, greenTag, blueTag