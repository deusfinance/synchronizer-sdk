import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { DetailsResultsPayload, DetailsState, DetailsStatus, WithDetailsState } from './types'
import { INFO_BASE_URL } from '../../constants/oracle'
import { makeHttpRequest } from '../../utils/http'
import { Sector } from '../../types'

const reducerPath = 'synchronizer_details'

const initialState: DetailsState = {
  status: DetailsStatus.LOADING,
  details: {},
}

export const fetchDetails = createAsyncThunk(`${reducerPath}/fetchDetails`, async () => {
  const { href: url } = new URL(`/registrar-detail.json`, INFO_BASE_URL)
  const response: {
    [symbol: string]: {
      name: string
      sector: string
      symbol: string
      short_symbol: string
      long_symbol: string
    }
  } = await makeHttpRequest(url)
  return Object.entries(response).reduce((acc: DetailsState['details'], [symbol, data]) => {
    acc[symbol] = {
      name: data.name,
      sector: data.sector === 'stock' ? Sector.STOCKS : data.sector === 'crypto' ? Sector.CRYPTO : Sector.FOREX,
      symbol: data.symbol,
      shortSymbol: data.short_symbol,
      longSymbol: data.long_symbol,
    }
    return acc
  }, {})
})

const detailsSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = DetailsStatus.LOADING
      })
      .addCase(fetchDetails.fulfilled, (state, action: PayloadAction<DetailsResultsPayload>) => {
        state.status = DetailsStatus.OK
        state.details = action.payload
      })
      .addCase(fetchDetails.rejected, () => {
        console.log('Unable to fetch details')
        return {
          ...initialState,
          status: DetailsStatus.ERROR,
        }
      })
  },
})

const { actions, reducer } = detailsSlice
export { reducerPath, actions, reducer }

export type DetailsActions = typeof detailsSlice['actions']

export function useDetailsState() {
  return useSelector((state: WithDetailsState) => state[reducerPath])
}
