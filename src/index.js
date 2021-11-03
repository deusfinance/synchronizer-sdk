import { trimTrailingSlash, throwErrorOnUnsupportedChainId } from './utils/index.js'

import { isSupportedChainId } from './client/utils.js'
import { getSignatures, getConducted, getQuotes, getDetails } from './client/oracles.js'
import * as constants from './client/constants.js'
import { prepareSignatureParams } from './client/functions.js'

export class DeusClient {
  constructor({
    providers = [],
    chainId,
    minimumSignatures,
  } = {}) {
    this.providerMapping = providers.map(provider => trimTrailingSlash(provider))
    this.chainId = chainId
    this.minimumSignatures = minimumSignatures

    // Sanitize params
    if (!this.providerMapping.length) throw new Error('providers is an empty array')
    throwErrorOnUnsupportedChainId(this.chainId)
    if (!this.minimumSignatures && this.minimumSignatures !== 0) throw new Error('minimumSignatures is not defined')
    if (this.minimumSignatures == 0) throw new Error('minimumSignatures can not be zero')
    if (this.minimumSignatures > this.providerMapping.length) throw new Error('minimumSignatures is greater than the number of providers')
  }

  setChainId(chainId) {
    throwErrorOnUnsupportedChainId(chainId)
    return this.chainId = chainId
  }

  get oracles() {
    return {
      getSignatures: async (secondaryChainId) => getSignatures(this.providerMapping, this.chainId, secondaryChainId),
      getConducted: async (secondaryChainId) => getConducted(this.providerMapping, this.chainId, secondaryChainId),
      getQuotes: async (secondaryChainId) => getQuotes(this.providerMapping, this.chainId, secondaryChainId),
      getDetails: async () => getDetails(this.providerMapping),
    }
  }

  get constants() {
    return constants
  }

  get functions() {
    return {
      prepareSignatureParams: (signatures, contract, action) => prepareSignatureParams(signatures, contract, action, this.minimumSignatures),
    }
  }

  get utils() {
    return {
      isSupportedChainId,
    }
  }

  getMethods() {
    return {
      getMethods: this.getMethods,
      setChainId: this.setChainId,
      oracles: this.oracles,
      constants: Object.keys(this.constants),
      functions: this.functions,
      utils: this.utils
    }
  }
}
