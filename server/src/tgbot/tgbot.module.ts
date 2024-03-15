import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { authMiddleware } from './tgbot.middleware'
import { BotService } from './tgbot.service'

@Module({
	imports: [
		TelegrafModule.forRoot({
			token: process.env.BOT_TOKEN,
			middlewares: [authMiddleware]
		})
	],
	providers: [BotService],
	exports: [BotService]
})
export class TgbotModule {}
