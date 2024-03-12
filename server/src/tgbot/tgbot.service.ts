import { Ctx, On, Start, Update } from 'nestjs-telegraf'
import { TGContext } from './interfaces/context.interface'

@Update()
export class BotService {
	@Start()
	async start(@Ctx() ctx: TGContext) {
		await ctx.reply('Привет')
	}

	@On('message')
	async on(@Ctx() ctx: TGContext) {
		console.log(ctx.user)
		await ctx.reply('Unathorized')
	}
}
