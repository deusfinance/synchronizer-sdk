import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { actions, useApplicationState } from '../state/application/slice'

export function useForceRefreshCallback() {
  const { forceRefresh } = useApplicationState()
  const dispatch = useDispatch()

  return useCallback(() => {
    dispatch(actions.updateForceRefresh(forceRefresh + 1))
  }, [dispatch, forceRefresh])
}
