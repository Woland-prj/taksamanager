import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { FormsModule } from './forms/forms.module'
import { FormsService } from './forms/forms.service'
import { MailModule } from './mail/mail.module'
import { MailService } from './mail/mail.service'
import { PollingModule } from './polling/polling.module'
import { PrismaModule } from './prisma/prisma.module'
import { TasksModule } from './tasks/tasks.module'
import { TasksService } from './tasks/tasks.service'
import { UsersModule } from './users/users.module'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotModule } from './tgbot/bot.module'
import { BotUpdate } from './tgbot/bot.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		BotModule,
		UsersModule,
		PrismaModule,
		AuthModule,
		MailModule,
		TasksModule,
		FormsModule,
		TasksModule,
		PollingModule
	],
	providers: [
		AppService,
		AuthService,
		JwtService,
		MailService,
		FormsService,
		TasksService,
		BotUpdate
	],
	controllers: [AppController]
})
export class AppModule {}
