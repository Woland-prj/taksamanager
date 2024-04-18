import { UseGuards } from '@nestjs/common'
import { JwtAccessAuthGuard } from '../guards/jwt-access-auth.guard'
import { JwtAdminAccessAuthGuard } from '../guards/jwt-admin-access-auth.guard'
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard'
import { JwtExecutorAccessAuthGuard } from '../guards/jwt-executor-access-auth.guard'

export const JwtAuth = () => UseGuards(JwtAccessAuthGuard)
export const JwtRefresh = () => UseGuards(JwtRefreshAuthGuard)
export const JwtAdminAuth = () => UseGuards(JwtAdminAccessAuthGuard)
export const JwtExecutorAuth = () => UseGuards(JwtExecutorAccessAuthGuard)
