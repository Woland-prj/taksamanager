'use client'
import { PageHeader } from '@/components/main/PageHeader/PageHeader'
import styles from './page.module.css'
import { createTaskURL } from '@/types/tasks'
import { TasksTable } from '@/components/main/TasksTable/TasksTable'

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
      <div className={styles.scrollbar}>
        <TasksTable/>
      </div>
    </main>
  )
}
