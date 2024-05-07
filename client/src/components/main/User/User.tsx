import TasksContainer from "../TasksContainer/TasksContainer"
import styles from './User.module.css'
export const User = () => {
    return(
        <main>
            <span>Профиль пользователя</span>
            <div>
                {/* <UserCard user={user}/> */}
                <div className={styles.scrollbar}>
                    <div>
                        <span>Задачи, выполняемые этим пользователем</span>
                        <TasksContainer/>
                    </div>
                    <div>
                        <span>Задачи, выполненные этим пользователем</span>
                        <TasksContainer/>
                    </div>
                    <div>
                        <span>Задачи, проваленные этим пользователем</span>
                        <TasksContainer/>
                    </div>
                </div>
            </div>
        </main>
    )
}