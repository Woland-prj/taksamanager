import { TaskStatus } from "@/types/tasks";
import { UserRole } from "@/types/user";

export const convertTaskStatus = (status: TaskStatus, userRole: string): TaskStatus | null => {
    if (userRole == UserRole.CLIENT.toString()) {
        switch (status) {
            case TaskStatus.MODIFIED: return TaskStatus.MODIFIED
            case TaskStatus.WAITCONSENT: return TaskStatus.WAITCONSENT
            case TaskStatus.INWORK: return TaskStatus.INWORK
            case TaskStatus.COMPLETED: return TaskStatus.INWORK
            case TaskStatus.EXPIRED: return TaskStatus.EXPIRED
            case TaskStatus.REJECTED: return TaskStatus.INWORK
            case TaskStatus.REJECTEDBYLEAD: return TaskStatus.REJECTEDBYLEAD
            case TaskStatus.VERIFYCOMPLETED: return TaskStatus.VERIFYCOMPLETED
            default: return null
        }
    }
    return status
    
}