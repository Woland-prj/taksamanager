import { TagOption } from '@/types/tasks'
import styles from '../components/main/TasksContainer/task/tag/Tag.module.css'

type TTagParameters = {tagClassName: string, src: string, text: string}

export const TagOptionToTagParameters = (option: TagOption, date?: string): TTagParameters => {
    switch (option){
        case TagOption.POST: return {
            tagClassName: styles.typeTag,
            src: '/post.png',
            text: 'Пост',
        }
        case TagOption.DESIGN: return{
            tagClassName: styles.typeTag,
            src: '/design.png',
            text: 'Дизайн',
        }
        case TagOption.VIDEO: return{
            tagClassName: styles.typeTag,
            src: '/video.png',
            text: 'Видео',
        }
        case TagOption.MONTAGE: return {
            tagClassName: styles.typeTag,
            src: '/montage.png',
            text: 'Монтаж',
        }
        case TagOption.PHOTO: return {
            tagClassName: styles.typeTag,
            src: '/photo.png',
            text: 'Фото',
        }
        case TagOption.MODIFIED: return {
            tagClassName: styles.modifiedTag,
            src: '/',
            text: 'Модерирование',
        }
        case TagOption.IN_WORK: return {
            tagClassName: styles.inworkTag,
            src: '/inwork.png',
            text: 'Рассмотрение',
        }
        case TagOption.EXPIRED: return {
            tagClassName: styles.expiredTag,
            src: '/expired.png',
            text: 'Просрочено',
        }
        case TagOption.CREATED: return {
            tagClassName: styles.createdTag,
            src: '/created.png',
            text: 'Ожидает подтверждения исполнителя',
        }
        case TagOption.COMPLETED: return {
            tagClassName: styles.completedTag,
            src: 'verify_completed_tag',   // src: '/complete.png',
            text: 'Выполнено, просмотрено' // text: 'Выполнено',
        }
        case TagOption.VERIFY_COMPLETED: return {
            tagClassName: styles.verifyCompletedTag,
            src: 'verify_completed_tag',
            text: 'Выполнено, просмотрено'
        }
        case TagOption.REJECTED: return {
            tagClassName: styles.rejectedTag,
            src: '/rejected_by_admin.png',  // src: '/rejected.png',
            text: 'Отклонено, просмотрено', // text: 'Отклонено',
        }
        case TagOption.REJECTED_BY_ADMIN: return {
            tagClassName: styles.rejectedByAdminTag,
            src: '/rejected_by_admin.png',
            text: 'Отклонено, просмотрено',
        }
        case TagOption.DEADLINE: return {
            tagClassName: styles.deadlineTag,
            src: '/deadline.png',
            text: 'Выполнить до ' + date,
        }
        default: return {
            tagClassName: 'Класс необрабатываемого тэга',
            src: '-',
            text: '-',
        }
    }
}