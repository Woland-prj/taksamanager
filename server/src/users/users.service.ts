import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRole } from '@prisma/client'
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
		const hashedPass = (await this.hash.genHash(
			createUserDto.password,
			passSalt
		)) as string
		const candidate = await this.prisma.user.findUnique({
			where: {
				email: createUserDto.email
			}
		})
		if (candidate)
			throw new HttpException(
				`User with email ${createUserDto.email} already exist`,
				HttpStatus.CONFLICT
			)
		return this.prisma.user.create({
			data: {
				profile: {
					create: {
						email: createUserDto.email,
						password: hashedPass,
						username: createUserDto.username,
						role: UserRole.NOTDEFINED
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

	findOne(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id: id
			}
		})
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: string) {
		return `This action removes a #${id} user`
	}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email: email
			}
		})
	}
}
