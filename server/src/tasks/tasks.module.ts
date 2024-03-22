import { Module } from '@nestjs/common'
import { FormsModule } from 'src/forms/forms.module'
import { FormsService } from 'src/forms/forms.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
	imports: [FormsModule, PrismaModule],
	controllers: [TasksController],
	providers: [TasksService, FormsService, PrismaService],
	exports: [TasksService]
})
export class TasksModule {}
