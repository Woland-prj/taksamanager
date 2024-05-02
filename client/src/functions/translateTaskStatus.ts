import { TaskStatus } from "@/types/tasks";

export const translateTaskStatus = (status: TaskStatus | undefined) => {
    switch (status) {
        case TaskStatus.MODIFIED:
            return 'Модерирование'
        case TaskStatus.COMPLETED:
            return 'В работе'
        case TaskStatus.EXPIRED:
            return 'Просрочена'
        case TaskStatus.INWORK:
            return 'В работе'
        case TaskStatus.REJECTED:
            return 'Отклонена'
        case TaskStatus.REJECTEDBYLEAD:
            return 'Отклонена'
        case TaskStatus.VERIFYCOMPLETED:
            return 'Выполнена'
        case TaskStatus.WAITCONSENT:
            return 'Назначение'
        default:
            return ''
    }
}