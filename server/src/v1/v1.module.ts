import { Module } from '@nestjs/common';
import { V1Service } from './v1.service';
import { V1Controller } from './v1.controller';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [V1Controller],
  providers: [V1Service],
  imports: [UsersModule],
})
export class V1Module {}
