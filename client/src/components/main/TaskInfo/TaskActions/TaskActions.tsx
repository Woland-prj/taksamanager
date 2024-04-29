import { Status } from "@/types/login_and_register";
import { FC } from "react";
import styles from './TaskActions.module.css'
import Button from "@/components/ui/Button/Button";

type TTaskActionsProps = {
    taskStatus: Status
    userRole: string
}

export const enum Actions {
    MODIFIED = 'MODIFIED',
    WAITCONSENT_CLIENT = 'WAITCONSENT_CLIENT_ADMIN',
    WAITCONSENT_EXECUTOR = 'WAITCONSENT_EXECUTOR',
    IN_WORK_CLIENT = 'IN_WORK_CLIENT',
    IN_WORK_EXECUTOR = 'IN_WORK_EXECUTOR',
    COMPLETED = 'COMPLETED',
    VERIFY_COMPLETED = 'VERIFY_COMPLETED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
    BLANK = 'BLANK'
}

export const TaskActions: FC<TTaskActionsProps> = () => {
    const actionsType: Actions = roleAndStatusToActions(taskStatus, userRole)
    return (<>
        {actionsType == Actions.BLANK && (<></>)}
        {actionsType == Actions.MODIFIED && (
            <div className={styles.buttonsBunch}>
                <Button
                    text='Пересоздать задачу'
                    bgColor="#363636"
                    fgColor="#FFFFFF"
                    action={async () => {}}
                />
                <Button
                    text='Назначить задачу'
                    bgColor="#363636"
                    fgColor="#FFFFFF"
                    action={async () => {}}
                />
            </div>
        )}
        {actionsType == Actions.WAITCONSENT_CLIENT && (
            <div className={styles.executors}>
                <span>Задача ожидает подтверждения от следующих исполнителей:</span>
                <Executors/>
            </div>
        )}
        {actionsType == Actions.WAITCONSENT_EXECUTOR && (
            <div className={styles.buttonsBunch}>
                <Button
                    text='Принять'
                    action={async () => {}}
                    fgColor="#338D5F"
                    bgColor="#C8FFE3"
                />
                <Button 
                    text='Отклонить'
                    action={async () => {}}
                    fgColor="#FF5B5B"
                    bgColor="#FFC5C5"
                />
            </div>
        )}
        {actionsType == Actions.IN_WORK_CLIENT && (
            <div className={styles.executors}>
                <span>Задача в данный момент выполняется следующими исполнителями:</span>
                <Executors/>
            </div>
        )}
        {actionsType == Actions.IN_WORK_CLIENT && (
            <InserLinkForm/>
        )
            // <div className={styles.buttonsBunch}>
            //     <input className={styles.button} type='text'></input>
            //     <Button
            //         text='Подтвердить выполнение работы'
            //         bgColor="#363636"
            //         fgColor="#FFFFFF"
            //         action={async () => {}}
            //     />
            // </div>
        }
        {actionsType == Actions.COMPLETED && (
            <div className={styles.completed}>
                <div className={styles.executors}>
                    <span>Задача выполнена следующими исполнителями:</span>
                    <Executors/>
                </div>
                <div>
                    <span>Проверьте соответствие проделанной работы с изначальным заказом:</span>
                    <ConsentCompletionForm/>
                </div>
            </div>
        )}
        {actionsType == Actions.VERIFY_COMPLETED && (
            <div className={styles.executors}>
                <span>Задача выполнена следующими исполнителями:</span>
                <Executors/>
            </div>
        )}
        {actionsType == Actions.REJECTED && (
            <Button
            text='К сожалению, данная задача отклонена.
            Попробуйте связаться с администратором, чтобы заново заполнит бриф задачи.'
            fgColor="#000000"
            bgColor="#FFFFFF"
            />
        )}
        {actionsType == Actions.EXPIRED && (
            <div>
                <span>Задача просрочена следующими исполнителями:</span>
                <Executors/>
            </div>
        )}
    </>)
}