'use client'
import Image from 'next/image'
import styles from './CardPictureField.module.css'
import { CardFieldProps } from '../types'
import { ChangeEvent, useState } from 'react'
import cn from 'clsx'

type errorType = 'notfile' | 'notimage' | 'toobig'
const avalibleSize: number = 1024 * 1024

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
})

const getErrorMessage = (error: errorType) => {
  switch (error) {
    case 'notfile':
      return 'Файл не выбран'
    case 'notimage':
      return 'Файл не является изображением'
    case 'toobig':
      return 'Файл слишком большой'
    default:
      return 'Неизвестная ошибка'
  }
}

const CardPictureField: React.FC<CardFieldProps> = ({ placeholder, setData, fieldName, changeable }) => {
  const [error, setError] = useState<errorType | null>(null)
  const [avatar, setAvatar] = useState<string | null>(placeholder)

  const isFileValid = (file: File): boolean => {
    if (!file.type.includes('image')) {
      setError('notimage')
      return false
    }
    if (file.size > avalibleSize) {
      setError('toobig')
      return false
    }
    return true
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log(e.target.files)
    const files = e.target.files
    if (!files || !files[0]) {
      setError('notfile')
      return
    }
    const file: File = files[0]
    if (isFileValid(file)) {
      const base64Avatar = await toBase64(file)
      setAvatar(base64Avatar as string)
      setData(prev => ({ ...prev, [fieldName]: base64Avatar }))
      setError(null)
    }
  }

  return (
    <div className={styles.user_avatar}>
      <label htmlFor="avatar">
        <Image
          className={cn(styles.avatar_img, avatar ? styles.avatar_img_rounded : null)}
          src={avatar ? avatar : '/default_avatar.svg'}
          alt={'imgProfile'}
          width={100}
          height={100}
        />
      </label>
      {changeable && <input type="file" id="avatar" onChange={handleChange} className={styles.input} />}
      {error && <div className={styles.error}>
        <Image
          src={'/error.svg'}
          alt={'error'}
          width={20}
          height={20}
        />
        <span>{getErrorMessage(error)}</span>
      </div>}
    </div>
  )
}

export default CardPictureField
