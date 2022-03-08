import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import {
  Conducted,
  ConductedResultsPayload,
  ConductedState,
  ConductedStatus,
  OracleResponse,
  WithConductedState,
} from './types'
import { INFO_BASE_URL, ORACLE_NETWORK_NAMES } from '../../constants/oracle'
import { makeHttpRequest } from '../../utils/http'

const reducerPath = 'synchronizer_conducted'

const initialState: ConductedState = {
  status: ConductedStatus.LOADING,
  conducted: {},
}

export const fetchConducted = createAsyncThunk(`${reducerPath}/fetchConducted`, async () => {
  const results = await Promise.allSettled(
    Object.entries(ORACLE_NETWORK_NAMES).map(async ([chainId, networkName]) => {
      const { href: url } = new URL(`/${networkName}/conducted.json`, INFO_BASE_URL)
      const response: OracleResponse = await makeHttpRequest(url)
      return {
        chainId: Number(chainId),
        result: response.tokens,
      }
    })
  )

  // Bind results to according network
  return results.reduce((acc: { [chainId: number]: Conducted[] }, res) => {
    if (res.status !== 'fulfilled') return acc
    acc[res.value.chainId] = res.value.result
    return acc
  }, {})
})

const conductedSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConducted.pending, (state) => {
        state.status = ConductedStatus.LOADING
      })
      .addCase(fetchConducted.fulfilled, (state, action: PayloadAction<ConductedResultsPayload>) => {
        state.status = ConductedStatus.OK
        state.conducted = action.payload
      })
      .addCase(fetchConducted.rejected, () => {
        console.log('Unable to fetch conducted')
        return {
          ...initialState,
          status: ConductedStatus.ERROR,
        }
      })
  },
})

const { actions, reducer } = conductedSlice
export { reducerPath, actions, reducer }

export type ConductedActions = typeof conductedSlice['actions']

export function useConductedState() {
  return useSelector((state: WithConductedState) => state[reducerPath])
}
