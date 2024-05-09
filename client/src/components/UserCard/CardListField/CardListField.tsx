import cn from 'clsx'
import styles from './CardListField.module.css'
import { CardFieldType, CardListFieldProps } from '../types'
import { ListOption, UserRole } from '@/types/user'

const CardListField: React.FC<CardListFieldProps<ListOption<UserRole>>> = ({ label, type, placeholder, setData, fieldName, options }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData(prev => ({ ...prev, [fieldName]: event.target.value }))
  }

  return (
    <div className={cn(styles.card_field, type === CardFieldType.BLOCK ? styles.block : styles.inline)}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={styles.select} onChange={handleChange} defaultValue={placeholder}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default CardListField
