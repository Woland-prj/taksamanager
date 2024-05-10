import { changeUserInfoById } from "@/functions/userOperations"
import styles from './CardButton.module.css'

type CardButtonProps = {
  text: string
  action: () => void
}

const CardButton: React.FC<CardButtonProps> = ({ text, action }) => {
  return (
    <button className={styles.button} onClick={async e => { e.preventDefault(); console.log(await action()) }} >{text}</button>
  )
}

export default CardButton
