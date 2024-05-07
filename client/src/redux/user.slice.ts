import { TUser } from '@/types/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state: TUser | null, action: PayloadAction<TUser>) {
			state = action.payload
		}
	}
})
