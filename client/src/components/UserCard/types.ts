import { TUpdateUser } from '@/types/user'

export enum CardMode {
	UPDATE_ADMIN = 'UPDATE_ADMIN',
	UPDATE_SELF = 'UPDATE_SELF',
	VIEW = 'VIEW'
}

export enum CardFieldType {
	PLAIN = 'PLAIN',
	BLOCK = 'BLOCK',
	INLINE = 'INLINE'
}

export type CardFieldProps = {
	fieldName: string
	placeholder: string
	setData: React.Dispatch<React.SetStateAction<TUpdateUser>>
	changeable: boolean
}

export type CardTextFieldProps = CardFieldProps & {
	label?: string
	type: CardFieldType
}

export type CardListFieldProps<T> = CardTextFieldProps & {
	options: T[]
}
