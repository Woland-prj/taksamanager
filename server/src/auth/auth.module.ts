import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import { MailModule } from '../mail/mail.module'
import { MailService } from '../mail/mail.service'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAccessStrategy } from './strategys/jwt-access.strategy'
import { JwtAdminAccessStrategy } from './strategys/jwt-admin-access.strategy'
import { JwtRefreshStrategy } from './strategys/jwt-refresh.strategy'
import { LocalStrategy } from './strategys/local.strategy'
import { TokenService } from './token.service'
import { JwtExecutorAccessStrategy } from './strategys/jwt-executor-access.strategy'

@Module({
	imports: [UsersModule, PassportModule, JwtModule, MailModule, ConfigModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaService,
		TokenService,
		MailService,
		LocalStrategy,
		JwtAccessStrategy,
		JwtAdminAccessStrategy,
		JwtExecutorAccessStrategy,
		JwtRefreshStrategy
	],
	exports: [AuthService, TokenService]
})
export class AuthModule {}
