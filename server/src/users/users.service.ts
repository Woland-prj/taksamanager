import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HashService } from './hashing.service'
import { MailService } from 'src/mail/mail.service'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private hashService: HashService,
		private mailService: MailService
	) {}

	async create(createUserDto: CreateUserDto) {
		const passSalt = await this.hashService.genSalt()
		const hashedPass = (await this.hashService.genHash(
			createUserDto.password,
			passSalt
		)) as string
		const candidate = await this.prismaService.user.findUnique({
			where: {
				email: createUserDto.email
			}
		})
		if (candidate)
			throw new HttpException(
				`User with email ${createUserDto.email} already exist`,
				HttpStatus.CONFLICT
			)
		this.mailService.sendActivationMail(
			createUserDto.email,
			`http:\\${process.env.API_HOST}:${process.env.SERVER_PORT}\${}`
		)
		return this.prismaService.user.create({
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
		return this.prismaService.user.findUnique({
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
		return this.prismaService.user.findUnique({
			where: {
				email: email
			}
		})
	}
}
