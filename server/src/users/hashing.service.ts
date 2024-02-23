import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
	async genSalt() {
		return await bcrypt.genSalt()
	}

	async genHash(password: string, salt: string) {
		return await bcrypt.hash(password, salt)
	}

	async compareHash(password: string, hash: string) {
		return await bcrypt.compare(password, hash)
	}
}
