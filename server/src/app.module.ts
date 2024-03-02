import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { MailModule } from './mail/mail.module'
import { MailService } from './mail/mail.service'
import { PrismaModule } from './prisma/prisma.module'
import { TgbotModule } from './tgbot/tgbot.module'
import { BotService } from './tgbot/tgbot.service'
import { UsersModule } from './users/users.module'

@Module({
	imports: [UsersModule, PrismaModule, AuthModule, MailModule, TgbotModule],
	providers: [AppService, AuthService, JwtService, MailService, BotService],
	controllers: [AppController]
})
export class AppModule {}
