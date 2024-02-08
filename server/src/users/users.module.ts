import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { HashService } from './hashing.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService, PrismaService, HashService],
	exports: [UsersService, HashService]
})
export class UsersModule {}
