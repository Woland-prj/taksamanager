import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable
} from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { MailService } from 'src/mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HashService } from './hashing.service'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private hashService: HashService,
		private mailService: MailService
	) {}

	async create(createUserDto: CreateUserReqDto): Promise<CreateUserResDto> {
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
		const activationLinkId: string = uuidv4()
		// FIX: Проверка на то, что такого email не существует
		this.mailService.sendActivationMail(
			createUserDto.email,
			`${process.env.VALIDATION_URL_PREFIX}/${activationLinkId}`
		)
		// const { id, username, email, ...other } =
		// 	await this.prismaService.user.create({
		// 		data: {
		// 			email: createUserDto.email,
		// 			password: hashedPass,
		// 			username: createUserDto.username,
		// 			role: UserRole.NOTDEFINED,
		// 			actLink: activationLinkId
		// 		}
		// 	})
		return { id: '1', username: '1', email: '1' }
		// return { id, username, email }
	}

	findAll() {
		return `This action returns all users`
	}

	async findOne(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: id
			}
		})
		const { password, actLink, ...other } = user
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		return other
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

	async validateEmail(actLinkUuid: string) {
		const userData = await this.prismaService.user.findUnique({
			where: {
				actLink: actLinkUuid
			}
		})
		if (!userData) {
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: 'There is no account with this link uuid'
				},
				HttpStatus.NOT_FOUND
			)
		}
		if (userData.isActivated) {
			throw new ForbiddenException()
		}
		await this.prismaService.user.update({
			where: {
				id: userData.id
			},
			data: {
				isActivated: true
			}
		})
	}
}
