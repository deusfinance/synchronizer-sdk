import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { Signatures, SignaturesResultPayload, SignaturesState, SignaturesStatus, WithSignaturesState } from './types'
import { INFO_BASE_URL, ORACLE_NETWORK_NAMES } from '../../constants/oracle'
import { makeHttpRequest } from '../../utils/http'
import { useSelector } from 'react-redux'

const reducerPath = 'synchronizer_signatures'

const initialState: SignaturesState = {
  status: SignaturesStatus.LOADING,
  signatures: {},
}

export const fetchSignatures = createAsyncThunk(`${reducerPath}/fetchSignatures`, async () => {
  const results = await Promise.allSettled(
    Object.entries(ORACLE_NETWORK_NAMES).map(async ([chainId, networkName]) => {
      const { href: url } = new URL(`/${networkName}/signatures.json`, INFO_BASE_URL)
      const response: Signatures = await makeHttpRequest(url)
      return {
        chainId: Number(chainId),
        result: response,
      }
    })
  )

  // Bind results to according network
  return results.reduce((acc: { [chainId: number]: Signatures }, res) => {
    if (res.status !== 'fulfilled') return acc
    acc[res.value.chainId] = res.value.result
    return acc
  }, {})
})

const signaturesSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignatures.pending, (state) => {
        state.status = SignaturesStatus.LOADING
      })
      .addCase(fetchSignatures.fulfilled, (state, action: PayloadAction<SignaturesResultPayload>) => {
        state.status = SignaturesStatus.OK
        state.signatures = action.payload
      })
      .addCase(fetchSignatures.rejected, () => {
        console.log('Unable to fetch signatures')
        return {
          ...initialState,
          status: SignaturesStatus.ERROR,
        }
      })
  },
})

const { actions, reducer } = signaturesSlice
export { reducerPath, actions, reducer }

export type SignaturesActions = typeof signaturesSlice['actions']

export function useSignaturesState() {
  return useSelector((state: WithSignaturesState) => state[reducerPath])
}
