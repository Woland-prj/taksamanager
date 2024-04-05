import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { TokenService } from '../token.service'

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
	constructor(private tokenService: TokenService) {
		super()
	}
	// canActivate(context: ExecutionContext) {
	// 	const tokenDataFromDb = await this.tokenService.findToken(
	// 		this.tokenService.getTokenFromCookie(this.getRequest(context))
	// 	)
	// 	if (tokenDataFromDb) return super.canActivate(context)
	// 	return false
	// }
}
