import { useEffect } from 'react'
import { useAppDispatch, AppThunkDispatch } from '../store'

import { fetchSignatures } from './reducer'
import { useApplicationState } from '../application/reducer'

export default function Updater() {
  const thunkDispatch: AppThunkDispatch = useAppDispatch()
  const { forceRefresh } = useApplicationState()

  useEffect(() => {
    thunkDispatch(fetchSignatures())
  }, [thunkDispatch])

  // ignore initial effect
  useEffect(() => {
    if (forceRefresh) {
      console.info('Forcing a signatures refresh')
      thunkDispatch(fetchSignatures())
    }
  }, [forceRefresh])

  return null
}
