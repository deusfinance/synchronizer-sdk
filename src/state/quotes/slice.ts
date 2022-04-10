import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { OracleResponse, Quotes, QuotesResultPayload, QuotesState, QuotesStatus, WithQuotesState } from './types'
import { INFO_BASE_URL, ORACLE_NETWORK_NAMES } from '../../constants/oracle'
import { makeHttpRequest } from '../../utils/http'

const reducerPath = 'synchronizer_quotes'

const initialState: QuotesState = {
  status: QuotesStatus.LOADING,
  quotes: {},
}

export const fetchQuotes = createAsyncThunk(`${reducerPath}/fetchQuotes`, async () => {
  const results = await Promise.allSettled(
    Object.entries(ORACLE_NETWORK_NAMES).map(async ([chainId, networkName]) => {
      const { href: url } = new URL(`/${networkName}/price.json`, INFO_BASE_URL)
      const response: OracleResponse = await makeHttpRequest(url)

      // Modify response
      const result = Object.entries(response).reduce((acc: Quotes, [symbol, values]) => {
        const longPrice = values.Long?.price ?? 0
        const longOpen = !values.Long?.is_close
        const shortPrice = values.Short?.price ?? 0
        const shortOpen = !values.Short?.is_close

        acc[symbol] = {
          long: {
            price: longPrice.toFixed(6),
            open: !!longPrice && longOpen,
          },
          short: {
            price: shortPrice.toFixed(6),
            open: !!shortPrice && shortOpen,
          },
        }
        return acc
      }, {})
      return {
        chainId: Number(chainId),
        result,
      }
    })
  )

  // Bind results to according network
  return results.reduce((acc: { [chainId: number]: Quotes }, res) => {
    if (res.status !== 'fulfilled') return acc
    acc[res.value.chainId] = res.value.result
    return acc
  }, {})
})

const quotesSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.status = QuotesStatus.LOADING
      })
      .addCase(fetchQuotes.fulfilled, (state, action: PayloadAction<QuotesResultPayload>) => {
        state.status = QuotesStatus.OK
        state.quotes = action.payload
      })
      .addCase(fetchQuotes.rejected, () => {
        console.log('Unable to fetch quotes')
        return {
          ...initialState,
          status: QuotesStatus.ERROR,
        }
      })
  },
})

const { actions, reducer } = quotesSlice
export { reducerPath, actions, reducer }

export type QuotesActions = typeof quotesSlice['actions']

export function useQuotesState() {
  return useSelector((state: WithQuotesState) => state[reducerPath])
}
