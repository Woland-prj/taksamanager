import { TUser, UserRole } from '@/types/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TUser = {
	id: '',
	username: '',
	email: '',
	role: UserRole.ADMIN,
	isActivated: true,
	tgUsername: '',
	tgChatId: 0,
	teamId: '',
	teamColor: '',
	avatar: '',
	class: '11'
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		overwriteUser: (state, action: PayloadAction<TUser>) => {
			state = action.payload
		}
	}
})

export const userReducer = userSlice.reducer
export const userAction = userSlice.actions
