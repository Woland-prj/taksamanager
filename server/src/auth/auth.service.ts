import { Injectable } from '@nestjs/common'
import { IUser } from '../users/entities/user.entity'
import { HashService } from '../users/hashing.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private hashService: HashService
	) {}

	async validateUser(email: string, pass: string): Promise<IUser | null> {
		const user = await this.usersService.findByEmail(email)
		if (user && this.hashService.compareHash(pass, user.password)) {
			const { password, ...result } = user
			return result
		}
		return null
	}
}
