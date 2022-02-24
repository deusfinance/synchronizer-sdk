import { useEffect } from 'react'
import { useAppDispatch, AppThunkDispatch } from '../store'

import { fetchDetails } from './reducer'

export default function Updater() {
  const thunkDispatch: AppThunkDispatch = useAppDispatch()

  useEffect(() => {
    thunkDispatch(fetchDetails())
  }, [thunkDispatch])

  return null
}
