import { UserRole } from '@prisma/client'
import { Transform } from 'class-transformer'
import {
	IsBase64,
	IsDataURI,
	IsHexColor,
	IsIn,
	IsInt,
	IsNotEmpty,
	IsNumberString,
	IsOptional
} from 'class-validator'

export const tg = <T>(tbd: unknown): tbd is T => true

export class UpdateSelfUserDto {
	@IsOptional()
	@IsNotEmpty()
	username: string

	@IsOptional()
	@IsNotEmpty()
	tgUsername: string

	@IsOptional()
	@IsNotEmpty()
	// @IsDataURI()
	avatar: string
}

export class UpdateAdminUserDto {
	@IsOptional()
	@IsNotEmpty()
	username: string

	@IsOptional()
	@IsNotEmpty()
	class: number

	@IsOptional()
	@IsNotEmpty()
	tgUsername: string

	@IsOptional()
	@IsNotEmpty()
	@IsDataURI()
	avatar: string

	@IsOptional()
	@IsNotEmpty()
	@IsIn(['ADMIN', 'CLIENT', 'EXECUTOR'])
	role: UserRole

	@IsOptional()
	@IsNotEmpty()
	@IsHexColor()
	teamColor: string
}
