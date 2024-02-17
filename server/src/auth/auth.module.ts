import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAccessStrategy } from './jwt-access.strategy'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'
import { LocalStrategy } from './local.strategy'
import { TokenService } from './token.service'
import { MailService } from './mail.service'

@Module({
	imports: [UsersModule, PassportModule, JwtModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaService,
		TokenService,
    MailService,
		LocalStrategy,
		JwtAccessStrategy,
		JwtRefreshStrategy
	],
	exports: [AuthService, TokenService]
})
export class AuthModule {}
