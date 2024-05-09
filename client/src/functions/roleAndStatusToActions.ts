import { Actions } from "@/components/main/TaskInfo/TaskActions/TaskActions"
import { TaskStatus } from "@/types/tasks"
import { UserRole } from "@/types/user"

export const roleAndStatusToActions = (role: UserRole, status: TaskStatus | undefined, isUserExecutor: boolean, taskHasExecutor: boolean): Actions => {
    if ( status == TaskStatus.MODIFIED && role == UserRole.CLIENT )
        return Actions.MODIFIED_CLIENT
    if ( status == TaskStatus.MODIFIED && role == UserRole.ADMIN || UserRole.ROOT )
        return Actions.MODIFIED_ADMIN
    if ( status == TaskStatus.WAITCONSENT && (role != UserRole.EXECUTOR || !isUserExecutor) )
        return Actions.WAITCONSENT_CLIENT_ADMIN
    if ( status == TaskStatus.WAITCONSENT && (role == UserRole.EXECUTOR || isUserExecutor) )
        return Actions.WAITCONSENT_EXECUTOR
    if ( status == TaskStatus.INWORK && (role != UserRole.EXECUTOR || !isUserExecutor) )
        return Actions.IN_WORK_CLIENT_ADMIN
    if ( status == TaskStatus.INWORK && (role == UserRole.EXECUTOR || isUserExecutor) )
        return Actions.IN_WORK_EXECUTOR
    if ( status == TaskStatus.COMPLETED && (role == UserRole.ADMIN || UserRole.ROOT) && !isUserExecutor )
        return Actions.COMPLETED_ADMIN
    if ( status == TaskStatus.COMPLETED && ((role == UserRole.ADMIN || UserRole.ROOT) && isUserExecutor || (role == UserRole.EXECUTOR)) ) 
        return Actions.COMPLETED_EXECUTOR
    if ( status == TaskStatus.VERIFYCOMPLETED)
        return Actions.VERIFY_COMPLETED
    if ( status == TaskStatus.REJECTED )
        return Actions.REJECTED
    if ( status == TaskStatus.EXPIRED && taskHasExecutor )
        return Actions.EXPIRED_IN_WORK
    if ( status == TaskStatus.EXPIRED && !taskHasExecutor )
        return Actions.EXPIRED_IN_MODERATION
    return Actions.BLANK

}
//   MODIFIED_CLIENT = 'MODIFIED_CLIENT',
//   MODIFIED_ADMIN = 'MODIFIED_ADMIN',

//   WAITCONSENT_CLIENT_ADMIN = 'WAITCONSENT_CLIENT_ADMIN',
//   WAITCONSENT_EXECUTOR = 'WAITCONSENT_EXECUTOR',

//   IN_WORK_CLIENT_ADMIN = 'IN_WORK_CLIENT_ADMIN',
//   IN_WORK_EXECUTOR = 'IN_WORK_EXECUTOR',

//   COMPLETED_ADMIN = 'COMPLETED_ADMIN',
//   COMPLETED_CLIENT = 'COMPLETED_CLIENT',
//   COMPLETED_EXECUTOR = 'COMPLETED_EXECUTOR',

//   REJECTED = 'REJECTED', // Не используется
//   VERIFY_COMPLETED = 'VERIFY_COMPLETED',
//   VERIFY_REJECTED = 'VERIFY_REJECTED',
//   EXPIRED_IN_MODERATION = 'EXPIRED_IN_MODERATION',
//   EXPIRED_IN_WORK = 'EXPIRED_IN_WORK',
//   BLANK = 'BLANK'