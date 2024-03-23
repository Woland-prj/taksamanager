import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import {
	ApiBody,
	ApiCookieAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { refreshCookieData } from './constansts'
import { LoginReqDto, LoginResDto } from './dto/login.dto'
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { ValidatedRequest } from './types/request.types'

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiOperation({ summary: 'Create an access and refresh jwt tokens' })
	@ApiBody({ type: LoginReqDto })
	@ApiCreatedResponse({
		description: 'Tokens generated successfully',
		type: LoginResDto
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	async login(
		@Req() req: ValidatedRequest,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.login(req.user)
		res.cookie(
			refreshCookieData.name,
			tokens.refreshToken,
			refreshCookieData.options
		)
		return this.authService.login(req.user)
	}

	@ApiCookieAuth('refresh_jwt')
	@UseGuards(JwtRefreshAuthGuard)
	@Get('refresh')
	@ApiOperation({ summary: 'Regenerate an access and refresh jwt tokens' })
	@ApiOkResponse({
		description: 'Tokens regenerated successfully',
		type: LoginResDto
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	async refresh(
		@Req() req: ValidatedRequest,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.refresh(req.user, req)
		res.cookie(
			refreshCookieData.name,
			tokens.refreshToken,
			refreshCookieData.options
		)
		return this.authService.refresh(req.user, req)
	}
}
