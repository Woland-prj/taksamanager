import { Injectable } from '@nestjs/common'
import * as cookie from 'cookie'
import { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TokenService {
	constructor(private prismaService: PrismaService) {}

	// TODO: Добавить типизацию
	async saveToken(userId: string, token: string) {
		const suspectedOwner = await this.prismaService.jwtToken.findUnique({
			where: {
				userId: userId
			}
		})
		suspectedOwner
			? await this.prismaService.jwtToken.update({
					where: {
						userId: userId
					},
					data: {
						token: token
					}
				})
			: await this.prismaService.jwtToken.create({
					data: {
						userId: userId,
						token: token
					}
				})
	}

	// TODO: Добавить типизацию
	async findToken(token: string) {
		const tokenData = await this.prismaService.jwtToken.findUnique({
			where: {
				token: token
			}
		})
		return tokenData
	}

	getTokenFromCookie(req: Request): string | null {
		let token = null
		const cookies = cookie.parse(req.headers.cookie)
		if (cookies) {
			token = cookies.refresh_jwt as string
		}
		return token
	}
}
