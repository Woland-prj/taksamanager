import { Request } from 'express'
import { IUser } from 'src/users/entities/user.entity'

export interface ValidatedRequest extends Request {
	user: IUser
}
