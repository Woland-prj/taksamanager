'use client'
import { ProfileComponent } from "./ProfileComponent/ProfileComponent"
import styles from "./SideBar.module.css"
import { SideBarButton } from "./SideBarButton/SideBarButton"
import { redirectToPage } from "@/functions/redirectToPage"

export const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <ProfileComponent
        action={() => { return new Promise(() => { }) }}
      />
      <SideBarButton
        iconName='dashboard.svg'
        text='Доска задач'
        action={async () => { console.log('кнопка'); redirectToPage('/dashboard') }}
      />
      <SideBarButton
        iconName='team.svg'
        text='Команда'
        action={async () => { console.log('кнопка'); redirectToPage('/dashboard/team') }}
      />
    </div>)
}
