import { useCallback } from 'react'

import { useAppDispatch } from '../state/store'
import { useApplicationState } from '../state/application/reducer'
import { updateForceRefresh } from '../state/application/actions'

export function useForceRefreshCallback() {
  const { forceRefresh } = useApplicationState()
  const dispatch = useAppDispatch()

  return useCallback(() => {
    dispatch(updateForceRefresh(forceRefresh + 1))
  }, [dispatch, forceRefresh])
}
