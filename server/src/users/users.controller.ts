import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Req
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiHeader,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import {
	CreateUserReqDto,
	CreateUserResDto,
	GetUserResDto
} from './dto/create-user.dto'
import { UsersService } from './users.service'
import { JwtAuth } from 'src/auth/decorators/auth.decorator'
import { ValidatedRequest } from 'src/auth/types/request.types'

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

	@JwtAuth()
	@Get()
	@ApiOperation({ summary: 'Get user profile from db with JwtToken' })
	@ApiOkResponse({ type: GetUserResDto })
	@ApiNotFoundResponse({
		description: 'Account not found.'
	})
	@ApiForbiddenResponse({
		description: 'Forbidden.'
	})
	@ApiHeader({
		name: 'Authorization',
		description: 'Bearer <access_jwt>'
	})
	@ApiBearerAuth()
	getOne(@Req() req: ValidatedRequest) {
		return this.usersService.findOne(req.user.id)
	}
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
