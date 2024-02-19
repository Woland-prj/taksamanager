import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { MailModule } from './mail/mail.module';

@Module({
	imports: [UsersModule, PrismaModule, AuthModule, MailModule],
	providers: [AppService, AuthService, JwtService],
	controllers: [AppController]
})
export class AppModule {}
