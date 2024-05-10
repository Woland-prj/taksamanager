import cn from 'clsx'
import styles from './CardListField.module.css'
import { CardFieldType, CardListFieldProps } from '../types'
import { ListOption, UserRole } from '@/types/user'

export default function CardListField<T>({ label, type, placeholder, setData, fieldName, options, changeable }: CardListFieldProps<ListOption<T>>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData(prev => ({ ...prev, [fieldName]: event.target.value }))
  }

  return (
    <div className={cn(styles.card_field,
      type === CardFieldType.BLOCK ? styles.block : styles.inline,
      changeable ? styles.card_field_changeable : null
    )}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={styles.select} onChange={handleChange} defaultValue={placeholder}>
        {options.map((option) => (
          <option value={option.value as string} key={option.value as string}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

