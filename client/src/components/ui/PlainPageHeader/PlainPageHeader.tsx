import localFont from 'next/font/local'
import styles from './PlainPageHeader.module.css'
import cn from 'clsx'

const euclid500 = localFont({
  src: [{
    path: '../../../fonts/EuclidCircularBMedium.ttf',
    weight: '500',
  }]
})

const PlainPageHeader: React.FC<{ headerText: string }> = ({ headerText }) => {
  return (
    <div className={styles.header_block}>
      <h1 className={cn(styles.header_text, euclid500.className)}>
        {headerText}
      </h1>
    </div>
  )
}

export default PlainPageHeader
