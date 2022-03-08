export enum QuotesStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface OracleResponse {
  [symbol: string]: {
    Long?: {
      price: number
      fee: number
      is_close?: boolean
    }
    Short?: {
      price: number
      fee: number
      is_close?: boolean
    }
  }
}

export type Quote = {
  price: string
  open: boolean
}

export interface Quotes {
  [symbol: string]: {
    long: Quote
    short: Quote
  }
}

export interface QuotesState {
  status: QuotesStatus
  quotes: {
    [chainId: number]: Quotes
  }
}

export interface WithQuotesState {
  [path: string]: QuotesState
}

export interface QuotesResultPayload {
  [chainId: number]: Quotes
}
