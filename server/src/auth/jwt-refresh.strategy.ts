import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader('Cookie'),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_REFRESH
		})
	}

	async validate(payload: any) {
		return { id: payload.sub, email: payload.email }
	}
}
