import { createSlice } from '@reduxjs/toolkit'
import { AppState, useAppSelector } from '../store'

interface ApplicationState {
  forceRefresh: number
}

const initialState: ApplicationState = {
  forceRefresh: 0,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateForceRefresh: (state, { payload }) => {
      state.forceRefresh = payload
    },
  },
})

const { reducer } = applicationSlice
export default reducer

export function useApplicationState(): ApplicationState {
  return useAppSelector((state: AppState) => state.application)
}
