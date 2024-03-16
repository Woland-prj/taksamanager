import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { FormsModule } from 'src/forms/forms.module'
import { FormsService } from 'src/forms/forms.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { TasksModule } from 'src/tasks/tasks.module'
import { TasksService } from 'src/tasks/tasks.service'
import { PollingService } from './polling.service'

@Module({
	imports: [ScheduleModule.forRoot(), FormsModule, TasksModule, PrismaModule],
	providers: [PollingService, FormsService, TasksService, PrismaService],
	exports: [PollingService]
})
export class PollingModule {}
