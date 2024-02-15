import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { refreshCookieData } from './constansts'
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { ValidateRequest } from './types/request.types'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(
		@Req() req: ValidateRequest,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.login(req.user)
		res.cookie(
			refreshCookieData.name,
			tokens.refresh_token,
			refreshCookieData.options
		)
		return this.authService.login(req.user)
	}

	@UseGuards(JwtRefreshAuthGuard)
	@Get('refresh')
	async refresh(
		@Req() req: ValidateRequest,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.refresh(req.user, req)
		res.cookie(
			refreshCookieData.name,
			tokens.refresh_token,
			refreshCookieData.options
		)
		return this.authService.refresh(req.user, req)
	}
}
