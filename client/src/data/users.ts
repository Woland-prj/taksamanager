import { ListOption, UserRole } from '@/types/user'

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
