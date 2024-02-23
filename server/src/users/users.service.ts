import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HashService } from './hashing.service'
import { MailService } from 'src/mail/mail.service'
import { v4 as uuidv4 } from 'uuid'
import { profile } from 'console'

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
		const { id, profileId, username, email, ...other } =
			await this.prismaService.user.create({
				data: {
					profile: {
						create: {
							email: createUserDto.email,
							password: hashedPass,
							username: createUserDto.username,
							role: UserRole.NOTDEFINED,
							actLink: activationLinkId
						}
					}
				},
				include: {
					profile: true
				}
			})
		return { id, profileId, username, email }
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

	async validateEmail(actLinkUuid: string) {
		const profileData = await this.prismaService.profile.findUnique({
			where: {
				actLink: actLinkUuid
			}
		})
		if (!profileData) {
			throw new NotFoundException()
		}
		if (profileData.isActivated) {
			throw new ForbiddenException()
		}
		return this.prismaService.profile.update({
			where: {
				id: profileData.id
			},
			data: {
				isActivated: true
			}
		})
	}
}
