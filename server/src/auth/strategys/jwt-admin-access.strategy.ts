import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { UserRole } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtAdminAccessStrategy extends PassportStrategy(
	Strategy,
	'jwt-admin-access'
) {
	constructor(
		private configService: ConfigService,
		private userService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET_ACCESS')
		})
	}

	async validate(payload: { sub: string; email: string }) {
		const user = await this.userService.findOne(payload.sub)
		if (user.role === UserRole.ADMIN || user.role === UserRole.ROOT) return user
		// If user is not admin
		return null
	}
}
