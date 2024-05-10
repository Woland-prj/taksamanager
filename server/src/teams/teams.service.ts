import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { IUser } from 'src/users/entities/user.entity'

@Injectable()
export class TeamsService {
	constructor(private readonly prismaService: PrismaService) {}

	async createTeam(color: string) {
		return this.prismaService.team.create({
			data: {
				color
			}
		})
	}

	async getTeamByColor(color: string) {
		return this.prismaService.team.findUnique({
			where: {
				color
			}
		})
	}

	async createOrUpdateTeam(color: string, user: User) {
		if (!color) return null
		let team = await this.prismaService.team.findUnique({
			where: {
				color
			}
		})
		if (!team) {
			team = await this.createTeam(color)
		}
		return this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				team: {
					connect: {
						id: team.id
					}
				}
			}
		})
	}
}
