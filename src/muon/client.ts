import axios, { AxiosInstance } from 'axios'
import { getAddress } from '@ethersproject/address'

import { MuonResponse, RequestParams, SignaturesData, IError } from './types'
import { MUON_NETWORK_NAMES, MUON_BASE_URL } from '../constants/oracle'
import { SupportedChainId, SynchronizerChains } from '../constants/chains'
import { Type, isError, getErrorMessage } from './error'

export class MuonClient {
  private _api: AxiosInstance
  private _APP_ID = 'synchronizer'
  private _APP_METHOD = 'signature'
  public nSign: number

  constructor(baseURL?: string, nSign?: number) {
    this._api = axios.create({
      baseURL: baseURL ?? MUON_BASE_URL,
      timeout: 20000,
    })
    this.nSign = nSign ?? 2
  }

  private _getChecksumAddress(contract: string) {
    try {
      return getAddress(contract)
    } catch (err) {
      return false
    }
  }

  private _getRequestParams(contract: string, action: string, chainId: SupportedChainId): Type<RequestParams> {
    if (!contract) return new Error('Param `contract` is missing.')
    if (!action) return new Error('Param `action` is missing.')
    if (!chainId) return new Error('Param `chainId` is missing.')

    const tokenId = this._getChecksumAddress(contract)
    if (!tokenId) return new Error('Param `contract` is not a valid address.')
    if (action !== 'buy' && action !== 'sell') {
      return new Error('Param `action` is not supported. Try using buy or sell.')
    }
    if (!SynchronizerChains.includes(chainId)) return new Error('Param `chainId` is not supported.')

    return {
      tokenId,
      action,
      chain: MUON_NETWORK_NAMES[chainId],
      useMultiplier: false,
    }
  }

  private async _makeRequest(requestParams: RequestParams): Promise<Type<MuonResponse>> {
    const response = await this._api({
      method: 'post',
      url: '/',
      data: {
        app: this._APP_ID,
        method: this._APP_METHOD,
        nSign: this.nSign,
        params: requestParams,
      },
    })
    if (response.status !== 200) {
      return new Error('Unable to reach the Muon Network.')
    }
    return response.data
  }

  public async getSignatures(
    contract: string,
    action: string,
    chainId: SupportedChainId
  ): Promise<SignaturesData | IError> {
    try {
      const requestParams = this._getRequestParams(contract, action, chainId)
      if (isError(requestParams)) throw new Error(requestParams.message)
      console.info('Requesting data from Muon: ', requestParams)

      const response = await this._makeRequest(requestParams)
      if (isError(response)) throw new Error(response.message)
      console.info('Response from Muon: ', response)

      if ('error' in response) {
        throw new Error(response.error)
      } else if (!response.success || !response.result.confirmed) {
        throw new Error('An unknown Muon error has occured')
      }

      const result = response.result

      const reqId = `0x${result?.cid?.substring(1)}`
      const signature = result?.signatures[0]?.signature
      const owner = result?.signatures[0]?.owner
      const nonce = result?.data?.init?.nonceAddress
      const sigs = [
        {
          signature,
          owner,
          nonce,
        },
      ]

      return {
        success: true,
        data: {
          response,
          calldata: {
            price: result.data.result.price,
            expireBlock: result.data.result.expireBlock,
            reqId,
            sigs,
          },
        },
      }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        error: getErrorMessage(err),
      }
    }
  }
}
