import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HashService } from './hashing.service'

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private hash: HashService
	) {}

	async create(createUserDto: CreateUserDto) {
		const passSalt = await this.hash.genSalt()
		const hashedPass = await this.hash.genHash(createUserDto.password, passSalt)
		return this.prisma.user.create({
			data: {
				profile: {
					create: {
						email: createUserDto.email,
						password: hashedPass,
						username: createUserDto.username
					}
				}
			},
			include: {
				profile: true
			}
		})
	}

	findAll() {
		return `This action returns all users`
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
