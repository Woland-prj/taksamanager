'use client'

import { FC } from 'react'
import styles from './PageHeader.module.css'
import Button from '@/components/ui/Button/Button'
import localFont from 'next/font/local'
import cn from 'clsx'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
interface IPageHeader {
  href?: string
  sectionTitle?: string
  buttonText?: string | undefined
  buttonAction: () => Promise<void>
  textClassName?: string
  buttonClassName?: string
  fontColor?: string
  backgroundColor?: string
}

const euclid500 = localFont({
  src: [{
    path: '../../../fonts/EuclidCircularBMedium.ttf',
  }],
  weight: '500'
})
export const PageHeader: FC<IPageHeader> = ({
  href,
  sectionTitle,
  buttonText,
  buttonAction,
  textClassName,
  buttonClassName,
  fontColor,
  backgroundColor,
}) => {
  const buttonCn = cn(styles.button, buttonClassName, euclid500.className)
  const link = href ? href : ''
  const title = !sectionTitle ? '' : sectionTitle
  const definedButtonText = buttonText ? buttonText : ''
  const fgColor = fontColor ? fontColor : '#FFFFFF'
  const bgColor = backgroundColor ? backgroundColor : '#363636'
  return (
    <div className={styles.header}>
      <h1 className={cn(styles.section_name, textClassName, euclid500.className)}>{title}</h1>
      {link != '' && (
        <Link target='_blank' href={link}>
          <Button
            className={buttonCn}
            fgColor={fgColor}
            bgColor={bgColor}
            text={definedButtonText}
            action={async () => {
              await buttonAction()
            }}
          />
        </Link>
      )}
      {link == '' && (
        <Button
          className={buttonCn}
          fgColor={fgColor}
          bgColor={bgColor}
          text={definedButtonText}
          action={async () => {
            await buttonAction()
          }}
        />
      )}
    </div>
  )
}
