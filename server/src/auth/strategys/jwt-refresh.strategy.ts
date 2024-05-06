import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'
import { TokenService } from '../token.service'
import * as cookie from 'cookie'
import { Request } from 'express'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(
		private tokenService: TokenService,
		private configService: ConfigService,
		private userService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtRefreshStrategy.extractJwtToken
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET_REFRESH')
		})
	}

	private static extractJwtToken(req: Request): string | null {
		let token = null
		if (req.headers.cookie) {
			const cookies = cookie.parse(req.headers.cookie)
			if (cookies && cookies.refreshJwt) {
				token = cookies.refreshJwt as string
			}
		}
		return token
	}
	async validate(payload: { sub: string; email: string }) {
		return await this.userService.findOne(payload.sub)
	}
}
