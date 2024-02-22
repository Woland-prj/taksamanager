import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { JwtAccessAuthGuard } from 'src/auth/jwt-access-auth.guard'

@ApiBearerAuth()
@ApiTags('CRUD users operations')
@Controller({ path: 'users', version: '1' })
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Create profile instance and user instance' })
	@ApiResponse({ status: 201, description: 'User created successfully' })
	@ApiResponse({
		status: 409,
		description: 'User with email "email" already exist'
	})
	@ApiResponse({
		status: 400,
		description:
			'[ "email must be an email" | "password should not be empty" | "username should not be empty" ]'
	})
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get('/activate/:linkUuid')
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
