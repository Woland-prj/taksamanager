import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail } from 'class-validator'

export class LoginReqDto {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	password: string
}

export class LoginResDto {
	@ApiProperty()
	access_token: string

	@ApiProperty()
	refresh_token: string
}
