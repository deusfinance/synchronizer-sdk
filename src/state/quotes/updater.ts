import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchQuotes } from './slice'
import { useApplicationState } from '../application/slice'

export default function Updater() {
  const dispatch = useDispatch()
  const { forceRefresh } = useApplicationState()

  useEffect(() => {
    const loop = setInterval(() => dispatch(fetchQuotes()), 60 * 1000)
    dispatch(fetchQuotes())
    return () => clearInterval(loop)
  }, [dispatch])

  // ignore initial effect
  useEffect(() => {
    if (forceRefresh) {
      console.info('Forcing a quote refresh')
      dispatch(fetchQuotes())
    }
  }, [dispatch, forceRefresh])

  return null
}
