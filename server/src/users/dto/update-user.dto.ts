import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@IsNotEmpty()
	email: string

	@IsOptional()
	@IsNotEmpty()
	username: string

	@IsOptional()
	@IsNotEmpty()
	tgUsername: string
}
