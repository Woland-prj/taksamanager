import { Error404 } from "@/components/errors/Error404";
import styles from './notFound.module.css'
export default function ErrorPage() {
  return (
    <main className={styles.wrapper}>
      <Error404 />
    </main>
  )
}
