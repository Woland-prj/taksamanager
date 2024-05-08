'use client'
import { FC, useState } from "react";
import styles from './TaskActions.module.css'
import Button from "@/components/ui/Button/Button";
import { Executors } from "./Executors/Executors";
import { InsertLinkForm } from "./InsertLinkForm/InsertLinkForm";
import { TaskStatus } from "@/types/tasks";
import { UserRole } from "@/types/user";
import { roleAndStatusToActions } from "@/functions/roleAndStatusToActions";
import localFont from "next/font/local";
import cn from 'clsx'
import { redirectToTaskForm } from "@/functions/taskActions";
import { ExecutorSelection } from "./ExecutorsSelection/ExecutorSelection";
import { changeTaskByExecutor } from "@/functions/taskOperations";

type TTaskActionsProps = {
  taskStatus: TaskStatus | undefined
  userRole: UserRole
  isUserExecutor: boolean
  taskId: string
}

export const enum Actions {
  MODIFIED_CLIENT = 'MODIFIED_CLIENT',
  MODIFIED_ADMIN = 'MODIFIED_ADMIN',
  WAITCONSENT_CLIENT = 'WAITCONSENT_CLIENT',
  WAITCONSENT_EXECUTOR = 'WAITCONSENT_EXECUTOR',
  IN_WORK_CLIENT = 'IN_WORK_CLIENT',
  IN_WORK_EXECUTOR = 'IN_WORK_EXECUTOR',
  COMPLETED = 'COMPLETED',
  VERIFY_COMPLETED = 'VERIFY_COMPLETED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  BLANK = 'BLANK'
}

const euclid500 = localFont({
  src: [{
    path: '../../../../fonts/EuclidCircularBMedium.ttf',
    weight: '600',
  }]
})


export const TaskActions: FC<TTaskActionsProps> = ({ taskStatus, userRole, isUserExecutor, taskId }) => {
  const [isSelectionActive, setIsSelectionActive] = useState<boolean>(false)
  const actionsType: Actions = roleAndStatusToActions(userRole, taskStatus, isUserExecutor)
  return (<>
    <div className={cn(styles.actionsSet, euclid500.className)}>
      {actionsType == Actions.BLANK && (<></>)}
      {actionsType == Actions.MODIFIED_ADMIN && (
        <div className={styles.buttonsBunch}>
          <Button
            className={styles.button}
            text='Пересоздать задачу'
            bgColor="#363636"
            fgColor="#FFFFFF"
            action={redirectToTaskForm /*Отправить на создание задачи*/}
          />
          <Button
            className={styles.button}
            text='Назначить задачу'
            bgColor="#363636"
            fgColor="#FFFFFF"
            action={async () => { setIsSelectionActive(!isSelectionActive) } /*Вывести окно с людьми, которые могут быть назначены*/}
          />
          {isSelectionActive && (
            <ExecutorSelection className={cn(styles.actionsSet, euclid500.className)} taskId={taskId} />
          )}
        </div>
      )}
      {actionsType == Actions.WAITCONSENT_CLIENT && (
        <div className={styles.executors}>
          <span>Задача ожидает подтверждения от следующих исполнителей:</span>
          <Executors />
        </div>
      )}
      {actionsType == Actions.WAITCONSENT_EXECUTOR && (
        <div className={styles.buttonsBunch}>
          <Button
            className={styles.button}
            text='Принять'
            action={async () => { changeTaskByExecutor(taskId, TaskStatus.INWORK) } /* Перевести задачу в статус IN_WORK */}
            fgColor="#338D5F"
            bgColor="#C8FFE3"
          />
          <Button
            className={styles.button}
            text='Отклонить'
            action={async () => { changeTaskByExecutor(taskId, TaskStatus.REJECTED) } /* Перевести задачу в статус REJECTED TODO: В будущем планируется несколько исполнителей */}
            fgColor="#FF5B5B"
            bgColor="#FFC5C5"
          />
        </div>
      )}
      {actionsType == Actions.IN_WORK_CLIENT && (
        <div className={styles.executors}>
          <span>Задача в данный момент выполняется следующими исполнителями:</span>
          <Executors />
        </div>
      )}
      {actionsType == Actions.IN_WORK_EXECUTOR && (
        <InsertLinkForm taskId={taskId} />
      ) /* При заполнении и подтверждении переводит в статус COMPLETED */}
      {actionsType == Actions.COMPLETED && (
        <>
          <div className={styles.executors}>
            <span>Задача выполнена следующими исполнителями:</span>
            <Executors />
          </div>
          <div className={styles.completed_consent}>
            <span className={styles.span}>Проверьте соответствие проделанной работы с изначальным заказом:</span>
            <div className={cn(styles.buttonsBunch, styles.buttonsBunch_narrowGap)}>
              <Button
                className={cn(styles.button, styles.buttonWithText)}
                text={'https://...'/*taskResult*/}
                action={async () => { } /* Ничего */}
                fgColor="#808080"
                bgColor="#FFFFFF"
                borderColor="#363636"
              />
              <Button
                className={styles.button}
                text='Подтвердить выполнение работы'
                action={async () => { changeTaskByExecutor(taskId, TaskStatus.VERIFYCOMPLETED) } /* Перевести задачу в статус VERIFY_COMPLETED */}
                fgColor="#338D5F"
                bgColor="#C8FFE3"
              />
              <Button
                className={styles.button}
                text='Вернуть задачу в работу'
                action={async () => { changeTaskByExecutor(taskId, TaskStatus.INWORK) } /* Перевести задачу в статус INWORK*/}
                fgColor="#FF5B5B"
                bgColor="#FFC5C5"
              />
            </div>
          </div>
        </>
      )}
      {actionsType == Actions.VERIFY_COMPLETED && (
        <div className={styles.executors}>
          <span>Задача выполнена следующими исполнителями:</span>
          <Executors />
        </div>
      )}
      {actionsType == Actions.REJECTED && (
        <span
          className={styles.button}
        >К сожалению, данная задача отклонена.<br />
          Попробуйте связаться с администратором, чтобы заново заполнить бриф задачи.</span>
      )}
      {actionsType == Actions.EXPIRED && (
        <div>
          <span>Задача просрочена следующими исполнителями:</span>
          <Executors />
        </div>
      )}
    </div>
  </>)
}
