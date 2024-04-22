import { ProfileComponent } from "./ProfileComponent/ProfileComponent"
import styles from "./SideBar.module.css"
import exampleTaksa from '../../../../public/taksa.png'
import { SideBarButton } from "./SideBarButton/SideBarButton"

export const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <ProfileComponent
                username='EXAMPLE'
                imageName='taksa.png'
                action={() => {return new Promise(() => {})}}
            />
            <SideBarButton
                iconName='dashboard.png'
                text='Доска задач'
                action={() => {return new Promise(() => {})}}
            />
            <SideBarButton
                iconName='team.png'
                text='Команда'
                action={() => {return new Promise(() => {})}}
            />
        </div>)
}