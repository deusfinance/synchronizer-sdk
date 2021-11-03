import { chainIdToNetworkName, makeHttpRequest } from '../utils/index.js'

export const fetchSignatures = async (providerMapping, chainId) => {
  try {
    if (!providerMapping) {
      throw new Error('providerMapping is missing @fetchSignatures')
    }
    if (!chainId) {
      throw new Error('chainId is missing @fetchSignatures')
    }

    const networkName = chainIdToNetworkName(chainId)
    if (!networkName) throw new Error('networkName is null @fetchSignatures')

    const promises = providerMapping.map(provider => {
      const url = `${provider}/${networkName}/signatures.json`
      return makeHttpRequest(url)
    })

    let responses = await Promise.allSettled(promises)
    return responses.map((response) => {
      if (response.status === 'fulfilled') return response?.value ?? {}
      throw new Error(`response.status returns unfulfilled: ${response}`)
    })
  } catch (err) {
    console.log('Something went wrong while trying to fetch the signatures:')
    console.error(err)
    return null
  }
}
