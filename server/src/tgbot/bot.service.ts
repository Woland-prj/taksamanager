import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { Telegram } from 'telegraf'

@Injectable()
export class BotService {
	private tg: Telegram
	constructor(private usersService: UsersService) {
		this.tg = new Telegram(process.env.BOT_TOKEN)
	}

	async sendMessage(userId: string, text: string) {
		if (!userId) return
		const user = await this.usersService.findOne(userId)
		if (!user) return
		if (!user.tgChatId) return
		await this.tg.sendMessage(user.tgChatId, text, {
			parse_mode: 'HTML'
		})
	}
}
