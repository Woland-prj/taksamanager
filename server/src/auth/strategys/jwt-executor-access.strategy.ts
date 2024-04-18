import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { UserRole } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtExecutorAccessStrategy extends PassportStrategy(
	Strategy,
	'jwt-executor-access'
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
		console.log(user.role)
		if (user.role === UserRole.EXECUTOR || user.role === UserRole.ADMIN)
			return user
		// If user is not executor
		return null
	}
}
