import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

@Module({
	imports: [UsersModule],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
