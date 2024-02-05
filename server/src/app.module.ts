import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AppService]
})
export class AppModule { }
