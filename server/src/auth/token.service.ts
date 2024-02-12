import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TokenService {
	constructor(private prismaService: PrismaService) {}

	async saveToken(userId: string, token: string) {
		const suspectedOwner = await this.prismaService.jwtToken.findUnique({
			where: {
				userId: userId
			}
		})
		suspectedOwner
			? this.prismaService.jwtToken.update({
					where: {
						userId: userId
					},
					data: {
						token: token
					}
				})
			: this.prismaService.jwtToken.create({
					data: {
						userId: userId,
						token: token
					}
				})
	}
}
