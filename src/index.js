import { trimTrailingSlash, chainIdToNetworkName, isSupportedChainId } from './utils/index.js'
import { fetchSignatures } from './oracles/signatures.js'
import { fetchConducted } from './oracles/conducted.js'
import { fetchQuotes } from './oracles/quotes.js'
import { fetchDetails } from './oracles/details.js'
import { SUPPORTED_CHAINS_BY_NAME, SUPPORTED_CHAINS_BY_CHAIN_ID, SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID, ABI } from './constants/index.js'

export class DeusClient {
  constructor({
    providerMapping = [],
    chainId = 1,
    options = {},
  } = {}) {
    this.providerMapping = providerMapping.map(provider => trimTrailingSlash(provider))
    this.chainId = chainId
    this.verbose = options?.verbose ?? false
    this._sanitizeParams()
  }

  _sanitizeParams() {
    if (!this.providerMapping.length) throw new Error('providerMapping is an empty array')
    isSupportedChainId(this.chainId)
  }

  setChainId(chainId) {
    isSupportedChainId(chainId)
    return this.chainId = chainId
  }

  async getSignatures(secondaryChainId) {
    let chainId = secondaryChainId ?? this.chainId
    this.verbose && console.log(`Fetching signatures for chainId: ${chainId}`)
    isSupportedChainId(chainId)
    return fetchSignatures(this.providerMapping, chainId)
  }

  async getConducted(secondaryChainId) {
    let chainId = secondaryChainId ?? this.chainId
    this.verbose && console.log(`Fetching conducted for chainId: ${chainId}`)
    isSupportedChainId(chainId)
    return fetchConducted(this.providerMapping, secondaryChainId ?? this.chainId)
  }

  async getQuotes(secondaryChainId) {
    let chainId = secondaryChainId ?? this.chainId
    this.verbose && console.log(`Fetching quotes for chainId: ${chainId}`)
    isSupportedChainId(chainId)
    return fetchQuotes(this.providerMapping, secondaryChainId ?? this.chainId)
  }

  async getDetails() {
    this.verbose && console.log('Fetching registrar details')
    return fetchDetails(this.providerMapping)
  }

  get constants() {
    return {
      SUPPORTED_CHAINS_BY_NAME,
      SUPPORTED_CHAINS_BY_CHAIN_ID,
      SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID,
      ABI,
    }
  }

  getMethods() {
    return [
      this.setChainId,
      this.getSignatures,
      this.getConducted,
      this.getQuotes,
      this.getDetails,
      this.constants
    ]
  }
}
