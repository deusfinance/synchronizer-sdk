import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { Sector } from '../../types'
import { FeesState, FeesStatus, PartnerFeePayload, PlatformFeePayload, WithFeesState } from './types'

const reducerPath = 'synchronizer_fees'

const initialState: FeesState = {
  status: FeesStatus.LOADING,
  partnerFee: {
    [Sector.STOCKS]: '0',
    [Sector.CRYPTO]: '0',
    [Sector.FOREX]: '0',
    [Sector.COMMODITIES]: '0',
    [Sector.MISC]: '0',
  },
  platformFee: {
    [Sector.STOCKS]: '0',
    [Sector.CRYPTO]: '0',
    [Sector.FOREX]: '0',
    [Sector.COMMODITIES]: '0',
    [Sector.MISC]: '0',
  },
}

const feesSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {
    updatePlatformFee: (state, action: PayloadAction<PlatformFeePayload>) => {
      state.platformFee = {
        ...state.platformFee,
        ...action.payload,
      }
    },
    updatePartnerFee: (state, action: PayloadAction<PartnerFeePayload>) => {
      state.partnerFee = {
        ...state.partnerFee,
        ...action.payload,
      }
    },
  },
})

const { actions, reducer } = feesSlice
export { reducerPath, actions, reducer }

export type FeesActions = typeof feesSlice['actions']

export function useFeesState() {
  return useSelector((state: WithFeesState) => state[reducerPath])
}
