import { useCallback } from 'react'
import BigNumber from 'bignumber.js'

import { useFeesState } from './slice'
import { Sector } from '../../types'

export function useTotalFeeCallback() {
  const { platformFee, partnerFee } = useFeesState()
  return useCallback(
    (sector: Sector) => {
      return new BigNumber(platformFee[sector]).plus(partnerFee[sector]).div(1e18)
    },
    [platformFee, partnerFee]
  )
}

export function usePlatformFeeCallback() {
  const { platformFee } = useFeesState()
  return useCallback(
    (sector: Sector) => {
      return new BigNumber(platformFee[sector]).div(1e18)
    },
    [platformFee]
  )
}

export function usePartnerFeeCallback() {
  const { partnerFee } = useFeesState()
  return useCallback(
    (sector: Sector) => {
      return new BigNumber(partnerFee[sector]).div(1e18)
    },
    [partnerFee]
  )
}
