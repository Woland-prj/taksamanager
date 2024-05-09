type CardButtonProps = {
  text: string
  action: () => void
}

const CardButton: React.FC<CardButtonProps> = ({ text, action }) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

export default CardButton
