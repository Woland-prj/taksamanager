import { Update, Ctx, Start } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { getNotFoundMessage, getStartMessage } from './messages.template'
import { UsersService } from 'src/users/users.service'

@Update()
export class BotUpdate {
	constructor(private usersService: UsersService) {}

	@Start()
	async start(@Ctx() ctx: Context) {
		const user = await this.usersService.findByTgUsername(ctx.from.username)
		if (!user) {
			await ctx.replyWithHTML(getNotFoundMessage(ctx.from.first_name))
			return
		}
		await this.usersService.setTgChatId(user.id, ctx.chat.id)
		await ctx.replyWithHTML(getStartMessage(ctx.from.first_name, user.role))
	}
}
