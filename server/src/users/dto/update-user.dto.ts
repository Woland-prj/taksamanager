import { PartialType } from '@nestjs/mapped-types'
import { CreateUserReqDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserReqDto) {}
