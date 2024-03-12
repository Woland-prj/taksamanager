import { IUser } from 'src/users/entities/user.entity'
import { Context } from 'telegraf'

export interface TGContext extends Context {
	user: null | IUser
}
