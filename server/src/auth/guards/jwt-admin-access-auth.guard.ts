import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAdminAccessAuthGuard extends AuthGuard('jwt-admin-access') {}
