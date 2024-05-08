import { Module, OnModuleInit } from '@nestjs/common'
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
import { BotModule } from './tgbot/bot.module'
import { BotUpdate } from './tgbot/bot.update'
import { UsersModule } from './users/users.module'
import { BotService } from './tgbot/bot.service'
import { PrismaClient, UserRole } from '@prisma/client'
import { PrismaService } from './prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { HashService } from './users/hashing.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../.env.prod'
		}),
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
		BotUpdate,
		BotService
	],
	controllers: [AppController]
})
export class AppModule implements OnModuleInit {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly hashService: HashService
	) {}

	async onModuleInit() {
		const suggestedRoot = await this.prismaService.user.findMany({
			where: {
				role: UserRole.ROOT
			}
		})
		if (!suggestedRoot || suggestedRoot.length === 0) {
			const passSalt = await this.hashService.genSalt()
			const hashedPass = (await this.hashService.genHash(
				process.env.ROOT_PASSWORD,
				passSalt
			)) as string
			await this.prismaService.user.create({
				data: {
					username: process.env.ROOT_USER,
					email: process.env.SMTP_USER,
					role: UserRole.ROOT,
					password: hashedPass,
					actLink: uuidv4(),
					isActivated: true
				}
			})
		}
	}
}
