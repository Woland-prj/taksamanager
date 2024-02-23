import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
	Strategy,
	'jwt-access'
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_ACCESS
		})
	}

	async validate(payload: any) {
		return { id: payload.sub, email: payload.email }
	}
}
