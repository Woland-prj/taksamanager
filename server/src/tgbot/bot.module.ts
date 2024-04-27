import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'

@Module({
	imports: [
		TelegrafModule.forRoot({
			token: process.env.BOT_TOKEN
		})
	]
})
export class BotModule {}
