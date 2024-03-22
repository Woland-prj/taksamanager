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
