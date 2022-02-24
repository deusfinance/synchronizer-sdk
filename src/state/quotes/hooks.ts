import { AppState, useAppSelector } from '../store'

import { QuotesState } from './reducer'

export function useQuotesState(): QuotesState {
  return useAppSelector((state: AppState) => state.quotes)
}
