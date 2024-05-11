import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { FormsModule } from 'src/forms/forms.module'
import { FormsService } from 'src/forms/forms.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { TasksModule } from 'src/tasks/tasks.module'
import { TasksService } from 'src/tasks/tasks.service'
import { PollingService } from './polling.service'
import { BotModule } from 'src/tgbot/bot.module'
import { BotService } from 'src/tgbot/bot.service'
import { UsersModule } from 'src/users/users.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		FormsModule,
		TasksModule,
		PrismaModule,
		BotModule,
		UsersModule
	],
	providers: [
		PollingService,
		FormsService,
		TasksService,
		PrismaService,
		BotService,
		UsersModule
	],
	exports: [PollingService]
})
export class PollingModule {}
