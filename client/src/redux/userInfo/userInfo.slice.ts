import { TUser } from '@/types/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TUser = {
	id: '',
	username: '',
	email: '',
	role: '',
	isActivated: true,
	tgUsername: '',
	tgChatId: 0,
	teamId: '',
	teamColor: '',
	avatar: ''
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
