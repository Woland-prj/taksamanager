'use client'
import Button from '@/components/ui/Button/Button'
import { redirectToPage } from '@/functions/redirectToPage'
import { roleAndStatusToActions2 } from '@/functions/roleAndStatusToActions'
import { redirectToTaskForm } from '@/functions/taskActions'
import {
  changeTaskByAdmin,
  changeTaskByExecutor
} from '@/functions/taskOperations'
import { getUserById } from '@/functions/userOperations'
import { Status } from '@/types/login_and_register'
import { ITask, TaskStatus } from '@/types/tasks'
import { TUser, UserRole } from '@/types/user'
import cn from 'clsx'
import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import UserBlock from '../../TeamContainer/UserBlock/UserBlock'
import { ExecutorSelection } from './ExecutorsSelection/ExecutorSelection'
import { InsertLinkForm } from './InsertLinkForm/InsertLinkForm'
import styles from './TaskActions.module.css'

type TTaskActionsProps = {
  userRole: UserRole
  task: ITask
}

export const enum Actions {
  MODIFIED_CLIENT = 'MODIFIED_CLIENT',
  MODIFIED_ADMIN = 'MODIFIED_ADMIN',

  WAITCONSENT_CLIENT_ADMIN = 'WAITCONSENT_CLIENT_ADMIN',
  WAITCONSENT_EXECUTOR = 'WAITCONSENT_EXECUTOR',

  IN_WORK_CLIENT_ADMIN = 'IN_WORK_CLIENT_ADMIN',
  IN_WORK_EXECUTOR = 'IN_WORK_EXECUTOR',

  COMPLETED_ADMIN = 'COMPLETED_ADMIN',
  COMPLETED_CLIENT = 'COMPLETED_CLIENT',
  COMPLETED_EXECUTOR = 'COMPLETED_EXECUTOR',

  REJECTED = 'REJECTED', // Не используется
  VERIFY_COMPLETED = 'VERIFY_COMPLETED',
  VERIFY_REJECTED = 'VERIFY_REJECTED',
  EXPIRED_IN_MODERATION = 'EXPIRED_IN_MODERATION',
  EXPIRED_IN_WORK = 'EXPIRED_IN_WORK',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
  BLANK = 'BLANK'
}
const euclid500 = localFont({
  src: [
    {
      path: '../../../../fonts/EuclidCircularBMedium.ttf',
      weight: '600'
    }
  ]
})

export const TaskActions: FC<TTaskActionsProps> = ({ task, userRole }) => {
  const router = useRouter()
  const [isSelectionActive, setIsSelectionActive] = useState<boolean>(false)
  const actionsType: Actions = roleAndStatusToActions2(
    userRole,
    task.status,
    task.executorId ? true : false
  )
  const [executor, setExecutor] = useState<TUser | null>(null)
  const fetchUser = async (userId: string) => {
    try {
      let user = await getUserById(userId)
      if (!user) user = await getUserById(userId)
      console.log(user)
      console.log(actionsType)
      if (user) setExecutor(user)
    } catch (status) {
      if (status == Status.FORBIDDEN) router.replace('/auth/login')
      if (status == Status.NOTFOUND) router.replace('/dashboard')
    }
  }
  useEffect(() => {
    if (task.executorId) fetchUser(task.executorId)
  }, [])
  return (
    <>
      <div className={cn(styles.actionsSet, euclid500.className)}>
        {actionsType == Actions.BLANK && <></>}
        {actionsType == Actions.MODIFIED_ADMIN && (
          <div className={styles.buttonsBunch}>
            <Button
              className={styles.button}
              text='Пересоздать задачу'
              bgColor='#363636'
              fgColor='#FFFFFF'
              action={redirectToTaskForm /*Отправить на создание задачи*/}
            />
            <Button
              className={styles.button}
              text='Назначить задачу'
              bgColor='#363636'
              fgColor='#FFFFFF'
              action={
                async () => {
                  setIsSelectionActive(!isSelectionActive)
                } /*Вывести окно с людьми, которые могут быть назначены*/
              }
            />
            <Button
              className={styles.button}
              text='Отказаться от выполнения задачи'
              fgColor='#FF5B5B'
              bgColor='#FFC5C5'
              action={
                async () => {
                  changeTaskByAdmin(task.id, TaskStatus.VERIFYREJECTED)
                } /*Отправить на создание задачи*/
              }
            ></Button>
            {isSelectionActive && (
              <ExecutorSelection
                className={cn(styles.actionsSet, euclid500.className)}
                taskId={task.id}
              />
            )}
          </div>
        )}
        {actionsType == Actions.MODIFIED_CLIENT && (
          <span className={styles.message}>
            Задача находится на стадии обработки
          </span>
        )}
        {actionsType == Actions.WAITCONSENT_CLIENT_ADMIN && (
          <div className={styles.executors}>
            <span>Задача ожидает подтверждения от следующих исполнителей:</span>
            {executor && (
              <UserBlock
                user={executor}
                clickAction={() =>
                  redirectToPage(`/dashboard/user/${executor.id}`)
                }
              />
            )}
          </div>
        )}
        {actionsType == Actions.WAITCONSENT_EXECUTOR && (
          <div className={styles.buttonsBunch}>
            <Button
              className={styles.button}
              text='Принять'
              action={
                async () => {
                  await changeTaskByExecutor(task.id, TaskStatus.INWORK)
                  location.reload()
                } /* Перевести задачу в статус IN_WORK */
              }
              fgColor='#338D5F'
              bgColor='#C8FFE3'
            />
            <Button
              className={styles.button}
              text='Отклонить'
              action={
                async () => {
                  await changeTaskByExecutor(task.id, TaskStatus.MODIFIED)
                  router.replace('/dashboard')
                }
                /* Перевести задачу в статус WAITCONSENT TODO: В будущем планируется несколько исполнителей */
              }
              fgColor='#FF5B5B'
              bgColor='#FFC5C5'
            />
          </div>
        )}
        {(actionsType == Actions.IN_WORK_CLIENT_ADMIN ||
          actionsType == Actions.COMPLETED_CLIENT) && (
            <div className={styles.executors}>
              <span>
                Задача в данный момент выполняется следующими исполнителями:
              </span>
              {executor && (
                <UserBlock
                  user={executor}
                  clickAction={() =>
                    redirectToPage(`/dashboard/user/${executor.id}`)
                  }
                />
              )}
            </div>
          )}
        {
          actionsType == Actions.IN_WORK_EXECUTOR && (
            <InsertLinkForm taskId={task.id} />
          ) /* При заполнении и подтверждении переводит в статус COMPLETED */
        }
        {actionsType == Actions.COMPLETED_ADMIN && (
          <>
            <div className={styles.executors}>
              <span>Задача выполнена следующими исполнителями:</span>
              {executor && (
                <UserBlock
                  user={executor}
                  clickAction={() =>
                    redirectToPage(`/dashboard/user/${executor.id}`)
                  }
                />
              )}
            </div>
            <div className={styles.completed_consent}>
              <span className={styles.span}>
                Проверьте соответствие проделанной работы с изначальным заказом:
              </span>
              <div
                className={cn(
                  styles.buttonsBunch,
                  styles.buttonsBunch_narrowGap
                )}
              >
                <div className={styles.completed_consent}>
                  {task.result && <p className={styles.result}>{task.result}</p>}
                </div>
                {(task.status != TaskStatus.VERIFYCOMPLETED) && <><Button
                  className={styles.button}
                  text='Подтвердить выполнение работы'
                  action={
                    async () => {
                      await changeTaskByAdmin(task.id, TaskStatus.VERIFYCOMPLETED)
                      location.reload()
                    } /* Перевести задачу в статус VERIFY_COMPLETED */
                  }
                  fgColor='#338D5F'
                  bgColor='#C8FFE3'
                />
                  <Button
                    className={styles.button}
                    text='Вернуть задачу в работу'
                    action={
                      async () => {
                        await changeTaskByAdmin(task.id, TaskStatus.MODIFIED)
                        location.reload()
                      } /* Перевести задачу в статус MODIFIED */
                    }
                    fgColor='#FF5B5B'
                    bgColor='#FFC5C5'
                  /></>}
              </div>
            </div>
          </>
        )}
        {actionsType == Actions.COMPLETED_EXECUTOR && (
          <div className={styles.message}>
            <span>
              Задача находмится на прверке у администратора. Вас оповестят о
              результате
            </span>
          </div>
        )}
        {actionsType == Actions.VERIFY_COMPLETED && (
          <>
            <div className={styles.executors}>
              <span>Задача выполнена следующими исполнителями:</span>
              {executor && (
                <UserBlock
                  user={executor}
                  clickAction={() =>
                    redirectToPage(`/dashboard/user/${executor.id}`)
                  }
                />
              )}
            </div>
            <div className={styles.completed_consent}>
              <span>Материалы выполненной работы:</span>
              {task.result && <p className={styles.result}>{task.result}</p>}
            </div>
          </>
        )}
        {actionsType == Actions.VERIFY_REJECTED && (
          <span className={styles.message}>
            К сожалению, данная задача отклонена.
            <br />
            Попробуйте связаться с администратором, чтобы заново заполнить бриф
            задачи.
          </span>
        )}
        {actionsType == Actions.EXPIRED_IN_WORK && (
          <div className={styles.executors}>
            <span>Задача просрочена следующими исполнителями:</span>
            {executor && (
              <UserBlock
                user={executor}
                clickAction={() =>
                  redirectToPage(`/dashboard/user/${executor.id}`)
                }
              />
            )}
          </div>
        )}
        {actionsType == Actions.EXPIRED_IN_MODERATION && (
          <span className={styles.message}>Задача была просрочена</span>
        )}
      </div>
    </>
  )
}
