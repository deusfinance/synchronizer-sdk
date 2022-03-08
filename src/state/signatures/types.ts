export enum SignaturesStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface Signature {
  multiplier: number
  signs: {
    sell: {
      v: number
      r: string
      s: string
    }
    buy: {
      v: number
      r: string
      s: string
    }
  }
  price: string
  fee: number
  blockNo: number
  index: number
}

export interface Signatures {
  [contract: string]: Signature
}

export interface SignaturesState {
  status: SignaturesStatus
  signatures: {
    [chainId: number]: Signatures
  }
}

export interface WithSignaturesState {
  [path: string]: SignaturesState
}

export interface SignaturesResultPayload {
  [chainId: number]: Signatures
}
