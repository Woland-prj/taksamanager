import { ListOption, UserClass, UserRole } from '@/types/user'

export const roleOptions: ListOption<UserRole>[] = [
	{ value: UserRole.ADMIN, label: 'Модератор' },
	{ value: UserRole.EXECUTOR, label: 'Исполнитель' },
	{ value: UserRole.CLIENT, label: 'Заказчик' }
]

export const teamColors: string[] = [
	'#808080',
	'#ff0000',
	'#ff8a00',
	'#ebff00',
	'#05ff00',
	'#00ffe0',
	'#00a3ff',
	'#0500ff',
	'#ad00ff',
	'#ff00c7',
	'#007528',
	'#6e0700'
]

export const classOptions: ListOption<UserClass>[] = [
	{ value: UserClass.SEVEN, label: '7' },
	{ value: UserClass.EIGHT, label: '8' },
	{ value: UserClass.NINE, label: '9' },
	{ value: UserClass.TEN, label: '10' },
	{ value: UserClass.ELEVEN, label: '11' }
]

export const convertClassToEnum = (classNum: number): UserClass => {
	switch (classNum) {
		case 7:
			return UserClass.SEVEN
		case 8:
			return UserClass.EIGHT
		case 9:
			return UserClass.NINE
		case 10:
			return UserClass.TEN
		case 11:
			return UserClass.ELEVEN
		default:
			return UserClass.VOID
	}
}
