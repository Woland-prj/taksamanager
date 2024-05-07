import { SideBar } from "@/components/main/SideBar/SideBar"
import styles from "./layout.module.css"
import StoreProvider from "@/components/store/StoreProvider"
export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <div className={styles.container}>
        {children}
        <SideBar></SideBar>
      </div>
    </StoreProvider>
  )
}
