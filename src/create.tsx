import { useForceRefreshCallback as _useForceRefreshCallback } from './hooks/useApplication'
import {
  useTotalFeeCallback as _useTotalFeeCallback,
  usePlatformFeeCallback as _usePlatformFeeCallback,
  usePartnerFeeCallback as _usePartnerFeeCallback,
} from './state/fees/hooks'
import {
  useRegistrars as _useRegistrars,
  useRegistrarPairs as _useRegistrarPairs,
  useRegistrarByContract as _useRegistrarByContract,
  useRegistrarTokens as _useRegistrarTokens,
  useRegistrarTokenMap as _useRegistrarTokenMap,
} from './hooks/useRegistrars'

import { reducer as applicationReducer, reducerPath as applicationReducerPath } from './state/application/slice'
import { reducer as conductedReducer, reducerPath as conductedReducerPath } from './state/conducted/slice'
import { reducer as detailsReducer, reducerPath as detailsReducerPath } from './state/details/slice'
import { reducer as feesReducer, reducerPath as feesReducerPath } from './state/fees/slice'
import { reducer as quotesReducer, reducerPath as quotesReducerPath } from './state/quotes/slice'
import { reducer as signaturesReducer, reducerPath as signaturesReducerPath } from './state/signatures/slice'

import Updater from './updater'

type ArbitraryParams<T extends (...args: any) => any> = Parameters<T>

export function createSynchronizer() {
  const useForceRefreshCallback = (...args: ArbitraryParams<typeof _useForceRefreshCallback>) =>
    _useForceRefreshCallback(...args)
  const useTotalFeeCallback = (...args: ArbitraryParams<typeof _useTotalFeeCallback>) => _useTotalFeeCallback(...args)
  const usePlatformFeeCallback = (...args: ArbitraryParams<typeof _usePlatformFeeCallback>) =>
    _usePlatformFeeCallback(...args)
  const usePartnerFeeCallback = (...args: ArbitraryParams<typeof _usePartnerFeeCallback>) =>
    _usePartnerFeeCallback(...args)
  const useRegistrars = (...args: ArbitraryParams<typeof _useRegistrars>) => _useRegistrars(...args)
  const useRegistrarPairs = (...args: ArbitraryParams<typeof _useRegistrarPairs>) => _useRegistrarPairs(...args)
  const useRegistrarByContract = (...args: ArbitraryParams<typeof _useRegistrarByContract>) =>
    _useRegistrarByContract(...args)
  const useRegistrarTokens = (...args: ArbitraryParams<typeof _useRegistrarTokens>) => _useRegistrarTokens(...args)
  const useRegistrarTokenMap = (...args: ArbitraryParams<typeof _useRegistrarTokenMap>) =>
    _useRegistrarTokenMap(...args)

  return {
    slices: {
      [applicationReducerPath]: applicationReducer,
      [conductedReducerPath]: conductedReducer,
      [detailsReducerPath]: detailsReducer,
      [feesReducerPath]: feesReducer,
      [quotesReducerPath]: quotesReducer,
      [signaturesReducerPath]: signaturesReducer,
    },
    hooks: {
      useForceRefreshCallback,
      useTotalFeeCallback,
      usePlatformFeeCallback,
      usePartnerFeeCallback,
      useRegistrars,
      useRegistrarPairs,
      useRegistrarByContract,
      useRegistrarTokens,
      useRegistrarTokenMap,
    },
    Updater,
  }
}
