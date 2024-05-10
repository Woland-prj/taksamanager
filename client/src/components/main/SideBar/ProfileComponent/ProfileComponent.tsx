'use client'
import { refreshWithThrow } from '@/functions/refreshWithThrow'
import { getUser } from '@/functions/userOperations'
import { Status } from '@/types/login_and_register'
import { TUser } from '@/types/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import styles from './ProfileComponent.module.css'
export const ProfileComponent: FC = () => {
	const [user, setUser] = useState<TUser | null>(null)
	const router = useRouter()
	const getName = async () => {
		try {
			const user: TUser = await getUser()
			setUser(user)
		} catch (status) {
			if (status == Status.FORBIDDEN) {
				try {
					refreshWithThrow()
				} catch {
					router.replace('/auth/login')
				}
			}
		}
	}
	useEffect(() => {
		getName()
	}, [])
	return (
		<div
			className={styles.profile}
			onClick={() => router.push('/dashboard/user')}
		>
			<Image
				className={styles.image}
				src={user?.avatar ? user?.avatar : '/default_avatar.svg'}
				alt='avatar'
				width={30}
				height={30}
			/>
			<h2 className={styles.username}>{user?.username}</h2>
		</div>
	)
}
