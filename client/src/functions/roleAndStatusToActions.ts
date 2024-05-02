import { Actions } from "@/components/main/TaskInfo/TaskActions/TaskActions"
import { TaskStatus } from "@/types/tasks"
import { UserRole } from "@/types/user"

export const roleAndStatusToActions = (role: UserRole, status: TaskStatus | undefined): Actions => {
    // if ( status == TaskStatus.MODIFIED )
    //     return Actions.MODIFIED
    // if ( status == TaskStatus.WAITCONSENT && role != UserRole.EXECUTOR )
    //     return Actions.WAITCONSENT_CLIENT
    // if ( status == TaskStatus.WAITCONSENT && role == UserRole.EXECUTOR )
    //     return Actions.WAITCONSENT_EXECUTOR
    // if ( status == TaskStatus.INWORK && role != UserRole.EXECUTOR )
    //     return Actions.IN_WORK_CLIENT
    // if ( status == TaskStatus.INWORK && role == UserRole.EXECUTOR )
    //     return Actions.IN_WORK_EXECUTOR
    // if ( status == TaskStatus.COMPLETED )
    //     return Actions.COMPLETED
    // if ( status == TaskStatus.VERIFYCOMPLETED)
    //     return Actions.VERIFY_COMPLETED
    // if ( status == TaskStatus.REJECTED )
    //     return Actions.REJECTED
    // if ( status == TaskStatus.EXPIRED )
    //     return Actions.EXPIRED
    // return Actions.BLANK
    return Actions.REJECTED
}
// MODIFIED = 'MODIFIED',
// WAITCONSENT_CLIENT = 'WAITCONSENT_CLIENT',
// WAITCONSENT_EXECUTOR = 'WAITCONSENT_EXECUTOR',
// IN_WORK_CLIENT = 'IN_WORK_CLIENT',
// IN_WORK_EXECUTOR = 'IN_WORK_EXECUTOR',
// COMPLETED = 'COMPLETED',
// VERIFY_COMPLETED = 'VERIFY_COMPLETED',
// REJECTED = 'REJECTED',
// EXPIRED = 'EXPIRED',
// BLANK = 'BLANK'