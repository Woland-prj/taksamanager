import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAccessAuthGuard } from './auth/jwt-access-auth.guard'

@Controller({ version: '1' })
export class AppController {
	@UseGuards(JwtAccessAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user
	}
}
