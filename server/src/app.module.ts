import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  providers: [AppService]
})
export class AppModule { }
