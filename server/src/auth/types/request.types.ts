import { Request } from 'express'
import { IUser } from 'src/users/entities/user.entity'

export interface ValidateRequest extends Request {
	user: IUser
}
