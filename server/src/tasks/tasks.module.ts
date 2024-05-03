import { Module } from '@nestjs/common'
import { FormsModule } from 'src/forms/forms.module'
import { FormsService } from 'src/forms/forms.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { BotModule } from 'src/tgbot/bot.module'
import { BotService } from 'src/tgbot/bot.service'
import { UsersModule } from 'src/users/users.module'

@Module({
	imports: [FormsModule, PrismaModule, BotModule, UsersModule],
	controllers: [TasksController],
	providers: [TasksService, FormsService, PrismaService, BotService],
	exports: [TasksService]
})
export class TasksModule {}
