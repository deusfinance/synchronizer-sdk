import { fetchSignatures } from '../oracles/signatures.js'
import { fetchConducted } from '../oracles/conducted.js'
import { fetchQuotes } from '../oracles/quotes.js'
import { fetchDetails } from '../oracles/details.js'
import { throwErrorOnUnsupportedChainId } from '../utils/index.js'

export const getSignatures = async (providerMapping, primaryChainId, secondaryChainId) => {
  let chainId = secondaryChainId ? secondaryChainId : primaryChainId
  console.log(`Fetching signatures for chainId: ${chainId}`)
  throwErrorOnUnsupportedChainId(chainId)
  return fetchSignatures(providerMapping, chainId)
}

export const getConducted = async (providerMapping, primaryChainId, secondaryChainId) => {
  let chainId = secondaryChainId ? secondaryChainId : primaryChainId
  console.log(`Fetching conducted for chainId: ${chainId}`)
  throwErrorOnUnsupportedChainId(chainId)
  return fetchConducted(providerMapping, chainId)
}

export const getQuotes = async (providerMapping, primaryChainId, secondaryChainId) => {
  let chainId = secondaryChainId ? secondaryChainId : primaryChainId
  console.log(`Fetching quotes for chainId: ${chainId}`)
  throwErrorOnUnsupportedChainId(chainId)
  return fetchQuotes(providerMapping, chainId)
}

export const getDetails = async (providerMapping) => {
  console.log('Fetching registrar details')
  return fetchDetails(providerMapping)
}
