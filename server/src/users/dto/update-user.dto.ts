import { UserRole } from '@prisma/client'
import {
	IsDataURI,
	IsHexColor,
	IsIn,
	IsNotEmpty,
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
	class: string

	@IsOptional()
	@IsNotEmpty()
	tgUsername: string

	@IsOptional()
	@IsNotEmpty()
	@IsDataURI()
	avatar: string

	@IsOptional()
	@IsNotEmpty()
	@IsIn(['ADMIN', 'CLIENT', 'EXECUTOR', 'NOTDEFINED'])
	role: UserRole

	@IsOptional()
	@IsNotEmpty()
	@IsHexColor()
	teamColor: string
}
