import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user)
	}

	@UseGuards(JwtRefreshAuthGuard)
	@Post('refresh')
	async refresh(@Request() req) {
		return this.authService.login(req.user)
	}
}
