import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../users/entities/user.entity'
import { HashService } from '../users/hashing.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private hashService: HashService,
		private jwtService: JwtService
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
		return {
			access_token: this.jwtService.sign(payload, {
				secret: process.env.JWT_SECRET,
				expiresIn: '30min'
			})
		}
	}
}
