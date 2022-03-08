import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { fetchSignatures } from './slice'
import { useApplicationState } from '../application/slice'

export default function Updater() {
  const dispatch = useDispatch()
  const { forceRefresh } = useApplicationState()

  useEffect(() => {
    dispatch(fetchSignatures())
  }, [dispatch])

  // ignore initial effect
  useEffect(() => {
    if (forceRefresh) {
      console.info('Forcing a signatures refresh')
      dispatch(fetchSignatures())
    }
  }, [dispatch, forceRefresh])

  return null
}
