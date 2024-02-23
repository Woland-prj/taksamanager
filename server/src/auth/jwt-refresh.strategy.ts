import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { TokenService } from './token.service'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(private tokenService: TokenService) {
		super({
			jwtFromRequest: tokenService.getTokenFromCookie,
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_REFRESH
		})
	}

	async validate(payload: any) {
		return { id: payload.sub, email: payload.email }
	}
}
