export enum ConductedStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface OracleResponse {
  count: number
  tokens: {
    id: string
    long: string
    short: string
  }[]
}

export type Conducted = {
  id: string
  long: string
  short: string
}

export interface ConductedState {
  status: ConductedStatus
  conducted: {
    [chainId: number]: Conducted[]
  }
}

export interface WithConductedState {
  [path: string]: ConductedState
}

export interface ConductedResultsPayload {
  [chainId: number]: Conducted[]
}
