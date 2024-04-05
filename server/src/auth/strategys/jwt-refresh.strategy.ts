import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'
import { TokenService } from '../token.service'

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
			jwtFromRequest: tokenService.getTokenFromCookie,
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET_REFRESH')
		})
	}

	async validate(payload: { sub: string; email: string }) {
		return await this.userService.findOne(payload.sub)
	}
}
