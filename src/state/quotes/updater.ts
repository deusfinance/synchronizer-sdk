import { useEffect } from 'react'
import { useAppDispatch, AppThunkDispatch } from '../store'

import { fetchQuotes } from './reducer'
import { useApplicationState } from '../application/reducer'

export default function Updater() {
  const thunkDispatch: AppThunkDispatch = useAppDispatch()
  const { forceRefresh } = useApplicationState()

  useEffect(() => {
    const loop = setInterval(() => thunkDispatch(fetchQuotes()), 60 * 1000)
    thunkDispatch(fetchQuotes())
    return () => clearInterval(loop)
  }, [thunkDispatch])

  // ignore initial effect
  useEffect(() => {
    if (forceRefresh) {
      console.info('Forcing a quote refresh')
      thunkDispatch(fetchQuotes())
    }
  }, [forceRefresh])

  return null
}
