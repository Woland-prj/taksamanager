import { TagOption } from "@/types/tasks"


export const stringToTagOption = (text: string): TagOption => {
    switch (text) {
        case 'MODIFIED': return TagOption.MODIFIED
        case 'CREATED': return TagOption.CREATED
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
        default: return TagOption.UNDEFINED
    }
}