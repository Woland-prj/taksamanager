import cn from 'clsx'
import styles from './CardColorField.module.css'
import { CardFieldType, CardTextFieldProps } from '../types'
import { teamColors } from '@/data/users'
import { useState } from 'react'

const CardColorField: React.FC<CardTextFieldProps> = ({ label, type, placeholder, setData, fieldName, changeable }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(placeholder)
  return (
    <div className={cn(styles.card_field, type === CardFieldType.BLOCK ? styles.block : styles.inline)}>
      {label && <label className={styles.label}>{label}</label>}
      {!isOpen && <div className={styles.color} onClick={() => changeable ? setIsOpen(true) : null} style={{ backgroundColor: value }} />}
      {isOpen &&
        <div>
          {teamColors.map(color => (
            <div
              key={color}
              className={styles.color}
              style={{ backgroundColor: color }}
              onClick={() => {
                setData(prev => ({ ...prev, [fieldName]: color }))
                setValue(color)
                setIsOpen(false)
              }}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default CardColorField
