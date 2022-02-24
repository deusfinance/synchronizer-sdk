import { createSlice } from '@reduxjs/toolkit'
import { Sector } from '../../types'

export enum FeesStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

type Fee = {
  [Sector.STOCKS]: string
  [Sector.CRYPTO]: string
  [Sector.FOREX]: string
  [Sector.COMMODITIES]: string
  [Sector.MISC]: string
}

export interface FeesState {
  status: FeesStatus
  platformFee: Fee
  partnerFee: Fee
}

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
  name: 'fees',
  initialState,
  reducers: {
    updatePlatformFee: (state, { payload }) => {
      state.platformFee = {
        ...state.platformFee,
        ...payload,
      }
    },
    updatePartnerFee: (state, { payload }) => {
      state.partnerFee = {
        ...state.partnerFee,
        ...payload,
      }
    },
  },
})

const { actions, reducer } = feesSlice
export default reducer

export const { updatePlatformFee, updatePartnerFee } = actions
