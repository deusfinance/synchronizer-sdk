import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { ApplicationState, WithApplicationState } from './types'

const reducerPath = 'synchronizer_application'

const initialState: ApplicationState = {
  forceRefresh: 0,
}

const applicationSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {
    updateForceRefresh: (state, action: PayloadAction<number>) => {
      state.forceRefresh = action.payload
    },
  },
})

const { actions, reducer } = applicationSlice
export { reducerPath, actions, reducer }

export type ApplicationActions = typeof applicationSlice['actions']

export function useApplicationState() {
  return useSelector((state: WithApplicationState) => state[reducerPath])
}
