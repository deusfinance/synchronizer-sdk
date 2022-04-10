export interface IError {
  success: false
  error: string
}

export interface RequestParams {
  tokenId: string
  action: string
  chain: string
  useMultiplier: boolean
  id: string
}

export interface SignaturesData {
  success: true
  data: {
    response: MuonResponse
    calldata: {
      price: string
      timestamp: number
      reqId: string
      sigs: {
        signature: string
        owner: string
        nonce: string
      }[]
    }
  }
}

export interface MuonResponse {
  success: boolean
  error?: string
  result: {
    app: string
    cid: string
    confirmed: boolean
    confirmedAt: number
    data: {
      init: {
        none: string
        nonceAddress: string
        party: string
      }
      params: {
        action: string
        chain: string
        tokenId: string
        useMultiplier: boolean
        id: string
      }
      result: {
        action: string
        address: string
        chain: string
        price: string
      }
      timestamp: number
    }
    method: string
    nSign: number
    owner: string
    peerId: string
    signatures: {
      owner: string
      ownerPubKey: {
        x: string
        yParity: string
      }
      result: {
        action: string
        address: string
        chain: string
        price: string
      }
      signature: string
      timestamp: number
    }[]
    startedAt: number
    _id: string
  }
}
