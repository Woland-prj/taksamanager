import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../users/entities/user.entity'
import { HashService } from '../users/hashing.service'
import { UsersService } from '../users/users.service'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private hashService: HashService,
		private jwtService: JwtService,
		private tokenService: TokenService
	) {}

	async validateUser(email: string, pass: string): Promise<IUser | null> {
		const user = await this.usersService.findByEmail(email)
		if (user && (await this.hashService.compareHash(pass, user.password))) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: IUser) {
		const payload = { email: user.email, sub: user.id }
		const access_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET_ACCESS,
			expiresIn: '30m'
		})
		const refresh_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET_REFRESH,
			expiresIn: '30d'
		})
		this.tokenService.saveToken(user.id, refresh_token)
		return {
			access_token: access_token,
			refresh_token: refresh_token
		}
	}
}
