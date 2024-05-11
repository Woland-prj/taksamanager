'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import styles from './page.module.css'
import { createTaskURL } from '@/types/tasks'
import { TasksTable } from '@/components/main/TasksTable/TasksTable'
import { Scrollbar } from '@/components/Scrollbar/Scrollbar'

export default function Dashboard() {
  return (
    <main className={styles.workingField}>
      <header>
        <PageHeader
          sectionTitle='Доска задач'
          buttonText='Создать задачу'
          buttonAction={async () => { }}
          href={createTaskURL}
        />
      </header>
      <div className={styles.container}>
        <Scrollbar>
          <TasksTable />
        </Scrollbar>
      </div>
    </main>
  )
}
