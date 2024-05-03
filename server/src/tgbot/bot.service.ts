import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { getNewExecutedTaskMessage } from './messages.template'
import { Task } from '@prisma/client'
import { Telegram } from 'telegraf'

@Injectable()
export class BotService {
	private tg: Telegram
	constructor(private usersService: UsersService) {
		this.tg = new Telegram(process.env.BOT_TOKEN)
	}

	async sendMessage(userId: string, text: string) {
		const user = await this.usersService.findOne(userId)
		if (!user) return
		await this.tg.sendMessage(user.tgChatId, text, {
			parse_mode: 'HTML'
		})
	}
}
