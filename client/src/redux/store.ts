import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userInfo/userInfo.slice'

const rootReducer = combineReducers({ user: userSlice.reducer }) // userSlice.reducer

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
