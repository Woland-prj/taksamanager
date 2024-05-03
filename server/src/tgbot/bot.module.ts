import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotService } from './bot.service'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { MailModule } from 'src/mail/mail.module'

@Module({
	imports: [
		TelegrafModule.forRoot({
			token: process.env.BOT_TOKEN
		}),
		UsersModule,
		PrismaModule,
		MailModule
	],
	providers: [BotService]
})
export class BotModule {}
