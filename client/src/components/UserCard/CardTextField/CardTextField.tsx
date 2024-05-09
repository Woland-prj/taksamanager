import styles from './CardTextField.module.css'
import cn from 'clsx'
import { useState } from 'react'
import { CardFieldType, CardTextFieldProps } from '../types'
import Image from 'next/image'

type errorType = 'nottext'

const getErrorMessage = (error: errorType): string => {
  switch (error) {
    case 'nottext':
      return 'Поле не может быть пустым'
    default:
      return 'Неизвестная ошибка'
  }
}

const CardTextField: React.FC<CardTextFieldProps> = ({ label, type, placeholder, setData, fieldName, changeable }) => {
  const [error, setError] = useState<errorType | null>()
  const [value, setValue] = useState<string>(placeholder)
  const [isActive, setIsActive] = useState<boolean>(false)
  const checkError = (value: string | undefined) => {
    if (!value) {
      setError('nottext')
      return
    }
    setError(null)
  }

  return (
    <div className={cn(styles.card_field, type === CardFieldType.BLOCK ? styles.block : type == CardFieldType.PLAIN ? styles.plain : styles.inline)}>
      {label && <label className={cn(styles.label, type === CardFieldType.BLOCK ? styles.block_label : type == CardFieldType.PLAIN ? styles.plain_label : styles.inline_label)}>{label}</label>}
      <input
        className={cn(styles.input, isActive ? styles.active : null, changeable ? styles.changeable : null, error ? styles.error : null, type == CardFieldType.PLAIN ? styles.plain_input : type == CardFieldType.INLINE ? styles.inline_input : null)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => {
          setIsActive(false)
          setData(prev => ({ ...prev, [fieldName]: value }))
          checkError(value)
        }}
      />
      {error && <div className={styles.error}>
        <Image
          src={'/error.svg'}
          alt='error'
          width={20}
          height={20}
        />
        {getErrorMessage(error)}
      </div>}
    </div>
  )
}

export default CardTextField
