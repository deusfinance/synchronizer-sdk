import { Action, AnyAction, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Reducer } from 'redux'

import application from './application/reducer'
import conducted from './conducted/reducer'
import details from './details/reducer'
import fees from './fees/reducer'
import quotes from './quotes/reducer'
import signatures from './signatures/reducer'

const store = configureStore({
  reducer: {
    application: application as Reducer,
    conducted: conducted as Reducer,
    details: details as Reducer,
    fees: fees as Reducer,
    quotes: quotes as Reducer,
    signatures: signatures as Reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
})

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
export type AppThunkDispatch = ThunkDispatch<{}, void, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
