import {
	BadRequestException,
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable
} from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { MailService } from 'src/mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import {
	CreateUserReqDto,
	CreateUserResDto,
	GetUserResDto
} from './dto/create-user.dto'
import {
	UpdateSelfUserDto,
	UpdateAdminUserDto,
	tg
} from './dto/update-user.dto'
import { HashService } from './hashing.service'
import { TeamsService } from 'src/teams/teams.service'
import { IUser } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private hashService: HashService,
		private mailService: MailService,
		private teamsService: TeamsService
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
		const { id, username, email, ...other } =
			await this.prismaService.user.create({
				data: {
					email: createUserDto.email,
					password: hashedPass,
					username: createUserDto.username,
					role: UserRole.NOTDEFINED,
					actLink: activationLinkId
				}
			})
		// return { id: '1', username: '1', email: '1' }
		return { id, username, email }
	}

	async findAll(): Promise<GetUserResDto[]> {
		const res: GetUserResDto[] = []
		const dbUsers = await this.prismaService.user.findMany()
		dbUsers.forEach(user => {
			if (user.role != UserRole.ROOT) {
				let { password, actLink, ...other } = user
				res.push({
					...other
				})
			}
		})
		return res
	}

	async findOne(id: string): Promise<GetUserResDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: id
			}
		})
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		let { password, actLink, ...other } = user
		return {
			...other
		}
	}

	// private async toBinary(base64: string): Promise<Buffer> {
	//   const binS = atob(base64)
	//   const bytes = new Uint8Array(binS.length)
	//   for (let i = 0; i < binS.length; i++) {
	//     bytes[i] = binS.charCodeAt(i)
	//   }
	//   return bytes.buffer
	// }

	async update(
		id: string,
		adminChange: boolean,
		updateUserDto: UpdateSelfUserDto | UpdateAdminUserDto
	): Promise<GetUserResDto> {
		console.log(updateUserDto)
		const regExp = /\@| |\$/g
		if (updateUserDto.tgUsername)
			updateUserDto.tgUsername = updateUserDto.tgUsername.replace(regExp, '')
		let req = {
			where: {
				id: id
			},
			data: {}
		}
		let data = updateUserDto
		if (
			tg<UpdateAdminUserDto>(updateUserDto) &&
			adminChange &&
			updateUserDto.teamColor
		) {
			const { teamColor, ...other } = updateUserDto
			data = other
			let team = await this.teamsService.getTeamByColor(teamColor)
			if (!team) team = await this.teamsService.createTeam(teamColor)
			if (team) {
				req.data['team'] = { connect: { id: team.id } }
			}
		}
		if (
			tg<UpdateAdminUserDto>(updateUserDto) &&
			adminChange &&
			updateUserDto.class
		) {
			updateUserDto.class = parseInt(updateUserDto.class.toString())
		}
		req.data = { ...data, ...req.data }
		try {
			const updetedUser = await this.prismaService.user.update(req)
			if (!updetedUser)
				throw new HttpException('User not found', HttpStatus.NOT_FOUND)
			const { password, actLink, ...other } = updetedUser
			return {
				...other
			}
		} catch (error) {
			console.log(error)
			throw new BadRequestException()
		}
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

	findByTgUsername(tgUsername: string) {
		return this.prismaService.user.findUnique({
			where: {
				tgUsername: tgUsername
			}
		})
	}

	setTgChatId(id: string, chatId: number) {
		return this.prismaService.user.update({
			where: {
				id: id
			},
			data: {
				tgChatId: chatId
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
