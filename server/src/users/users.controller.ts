import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@ApiBearerAuth()
@ApiTags('CRUD users operations')
@Controller({ path: 'users', version: '1' })
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Create profile instance and user instance' })
	@ApiCreatedResponse({
		description: 'User and his profile was successfully created.',
		type: CreateUserResDto
	})
	@ApiResponse({
		status: 409,
		description: 'User with email "email" already exist.'
	})
	@ApiResponse({
		status: 400,
		description:
			'[ "email must be an email" | "password should not be empty" | "username should not be empty" ]'
	})
	@ApiBody({ type: CreateUserReqDto })
	create(@Body() createUserDto: CreateUserReqDto) {
		return this.usersService.create(createUserDto)
	}

	@Patch('/activate/:linkUuid')
	@HttpCode(204)
	@ApiOperation({
		summary:
			'Set activated status for user pofile, after that becomes inactive and returns a forbidden satuscode.'
	})
	@ApiNoContentResponse({
		description: 'Account activated successfully.'
	})
	@ApiNotFoundResponse({
		description: 'Theris no account with this link uuid.'
	})
	@ApiForbiddenResponse({
		description: 'Forbidden.'
	})
	validateEmail(@Param('linkUuid') linkUuid: string) {
		return this.usersService.validateEmail(linkUuid)
	}

	// @Get()
	// findAll() {
	// 	return this.usersService.findAll()
	// }
	//
	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.usersService.findOne(id)
	// }
	//
	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.usersService.update(id, updateUserDto)
	// }
	//
	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.usersService.remove(id)
	// }
}
