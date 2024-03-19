import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiHeader,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { AppService } from './app.service'
import { JwtAccessAuthGuard } from './auth/jwt-access-auth.guard'
import { ValidatedRequest } from './auth/types/request.types'

@ApiTags('Test endpoints')
@ApiBearerAuth()
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer <access_jwt>'
})
@Controller({ version: '1' })
export class AppController {
	constructor(private readonly appService: AppService) {}

	@UseGuards(JwtAccessAuthGuard)
	@Get('profile')
	@ApiOperation({ summary: 'Symply get data from access jwt payload' })
	getProfile(@Request() req: ValidatedRequest) {
		return req.user
	}
}
