import { TagOption } from "@/types/tasks"
import { TaskStatus } from "@prisma/client"

export const stringToTagOption = (text: string): TagOption => {
    switch (text) {
        case 'MODIFIED': return TagOption.MODIFIED
        case 'WAITCONSENT': return TagOption.WAIT_CONSENT
        case 'INWORK': return TagOption.IN_WORK
        case 'COMPLETED': return TagOption.COMPLETED
        case 'VERIFYCOMPLETED': return TagOption.VERIFY_COMPLETED
        case 'REJECTED': return TagOption.REJECTED
        case 'REJECTEDBYADMIN': return TagOption.REJECTED_BY_ADMIN
        case 'EXPIRED': return TagOption.EXPIRED

        case 'PHOTO': return TagOption.PHOTO
        case 'MONTAGE': return TagOption.MONTAGE
        case 'VIDEO': return TagOption.VIDEO
        case 'DESIGN': return TagOption.DESIGN
        case 'POST': return TagOption.POST
        case 'ANIMATION': return TagOption.ANIMATION

        default: return TagOption.UNDEFINED
    }
}