'use client'
import cn from 'clsx'
import localFont from 'next/font/local'
import styles from './layout.module.css'

const euclidMedium = localFont({
  src: '../../fonts/EuclidCircularBMedium.ttf',
  display: 'swap'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={styles.main}>
      <div className={styles.taksa}>
        <img src='/taksa.svg' />
      </div>
      <div className={styles.curve}>
        <div className={styles.imgBefore} />
        <img src='/curve.svg' />
        <div className={styles.imgAfter} />
      </div>
      <div className={cn(styles.text, euclidMedium.className)}>
        <h1>Такса</h1>
        <h2>рада вам</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  )
}
