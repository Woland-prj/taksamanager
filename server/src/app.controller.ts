import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAccessAuthGuard } from './auth/jwt-access-auth.guard'
import { ValidatedRequest } from './auth/types/request.types'

@Controller({ version: '1' })
export class AppController {
	@UseGuards(JwtAccessAuthGuard)
	@Get('profile')
	getProfile(@Request() req: ValidatedRequest) {
		return req.user
	}
}
