'use client'
import Form from '@/components/form/form'
import styles from '../login.module.css'
import redirectByJWT from '@/functions/redirectByJWT'

export default function LoginPage() {
  // redirectByJWT()
  return (
    <main className={styles.wrapper}>
      <Form formOption='login' />
    </main>
  )
}
