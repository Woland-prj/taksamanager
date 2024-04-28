'use client'
import { ProfileComponent } from "./ProfileComponent/ProfileComponent"
import styles from "./SideBar.module.css"
import { SideBarButton } from "./SideBarButton/SideBarButton"
import { redirectToPage } from "@/functions/redirectToPage"

export const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <ProfileComponent
                imageName='taksa.png'
                action={() => {return new Promise(() => {})}}
            />
            <SideBarButton
                iconName='dashboard.png'
                text='Доска задач'
                action={async () => {console.log('кнопка'); redirectToPage('/dashboard')}}
            />
            <SideBarButton
                iconName='team.png'
                text='Команда'
                action={() => {return new Promise(() => {})}}
            />
        </div>)
}