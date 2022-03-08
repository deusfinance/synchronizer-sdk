import { Sector } from '../../types'

export enum FeesStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export type Fee = {
  [Sector.STOCKS]: string
  [Sector.CRYPTO]: string
  [Sector.FOREX]: string
  [Sector.COMMODITIES]: string
  [Sector.MISC]: string
}

export interface FeesState {
  status: FeesStatus
  platformFee: Fee
  partnerFee: Fee
}

export interface WithFeesState {
  [path: string]: FeesState
}

export interface PlatformFeePayload {
  [sector: string]: string
}

export interface PartnerFeePayload {
  [sector: string]: string
}
