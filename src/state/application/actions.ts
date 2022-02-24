import { createAction } from '@reduxjs/toolkit'

export const updateForceRefresh = createAction<number>('application/updateForceRefresh')
