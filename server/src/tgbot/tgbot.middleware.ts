import { PrismaClient } from '@prisma/client'
import { TGContext } from './interfaces/context.interface'

export const authMiddleware = async (ctx: TGContext) => {
	console.log('lol')
	const prisma = new PrismaClient()
	const expectedUser = await prisma.user.findUnique({
		where: {
			tgUsername: ctx.from.username
		}
	})
	console.log(expectedUser)
	if (!expectedUser) {
		ctx.user = null
		return
	}
	ctx.user = expectedUser
}
