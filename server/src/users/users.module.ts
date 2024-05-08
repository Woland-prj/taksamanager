import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { HashService } from './hashing.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MailModule } from '../mail/mail.module'
import { MailService } from '../mail/mail.service'
import { TeamsModule } from 'src/teams/teams.module'
import { TeamsService } from 'src/teams/teams.service'

@Module({
	imports: [PrismaModule, MailModule, TeamsModule],
	controllers: [UsersController],
	providers: [
		UsersService,
		PrismaService,
		HashService,
		MailService,
		TeamsService
	],
	exports: [UsersService, HashService]
})
export class UsersModule {}
