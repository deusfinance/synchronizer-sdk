import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchDetails } from './slice'

export default function Updater() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDetails())
  }, [dispatch])

  return null
}
