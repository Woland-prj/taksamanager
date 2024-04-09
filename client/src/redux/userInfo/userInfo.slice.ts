import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: TUser = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        overwriteUser: (state, action:PayloadAction<TUser>) => {
            state = action.payload

        },
    },
})

export const userReducer = userSlice.reducer
export const userAction = userSlice.actions