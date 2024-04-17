import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserReqDto {
	@ApiProperty()
	@IsNotEmpty()
	username: string

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	password: string
}

export class CreateUserResDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	username: string

	@ApiProperty()
	email: string
}

export class GetUserResDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	username: string

	@ApiProperty()
	email: string

	@ApiProperty()
	role: string

	@ApiProperty()
	isActivated: boolean

	@ApiProperty()
	tgUsername: string | null

	@ApiProperty()
	tgChatId: number | null

	@ApiProperty()
	teamId: string | null
}
