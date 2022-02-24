import { useEffect } from 'react'
import { useAppDispatch, AppThunkDispatch } from '../store'

import { fetchConducted } from './reducer'

export default function Updater() {
  const thunkDispatch: AppThunkDispatch = useAppDispatch()

  useEffect(() => {
    thunkDispatch(fetchConducted())
  }, [thunkDispatch])

  return null
}
