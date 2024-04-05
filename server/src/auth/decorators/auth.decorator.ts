import { UseGuards } from '@nestjs/common'
import { JwtAccessAuthGuard } from '../guards/jwt-access-auth.guard'
import { JwtAdminAccessAuthGuard } from '../guards/jwt-admin-access-auth.guard'

export const JwtAuth = () => UseGuards(JwtAccessAuthGuard)
export const JwtAdminAuth = () => UseGuards(JwtAdminAccessAuthGuard)
