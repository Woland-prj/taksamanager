import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Controller({ version: '1' })
export class AppController {
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user
	}
}
