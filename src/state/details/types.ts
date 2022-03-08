import { Sector } from '../../types'

export enum DetailsStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface DetailsState {
  status: DetailsStatus
  details: {
    [symbol: string]: {
      name: string
      sector: Sector
      symbol: string
      shortSymbol: string
      longSymbol: string
    }
  }
}

export interface WithDetailsState {
  [path: string]: DetailsState
}

export interface DetailsResultsPayload {
  [symbol: string]: {
    name: string
    sector: Sector
    symbol: string
    shortSymbol: string
    longSymbol: string
  }
}
