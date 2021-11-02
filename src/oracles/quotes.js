import { chainIdToNetworkName, makeHttpRequest } from '../utils/index.js'

export const fetchQuotes = async (providerMapping, chainId) => {
  try {
    if (!providerMapping) {
      throw new Error('providerMapping is missing @fetchQuotes')
    }
    if (!chainId) {
      throw new Error('chainId is missing @fetchQuotes')
    }

    const networkName = chainIdToNetworkName(chainId)
    if (!networkName) throw new Error('networkName is null @fetchQuotes')

    const promises = providerMapping.map(provider => {
      const url = `${provider}/${networkName}/price.json`
      return makeHttpRequest(url)
    })

    let responses = await Promise.allSettled(promises)
    responses = responses.map((response) => {
      if (response.status === 'fulfilled') return response?.value ?? {}
      throw new Error(`response.status returns unfulfilled: ${response}`)
    })

    // Beautify + check if all nodes provide the same symbols by logging `count`, however we DON'T check for data anomalies,
    // due to the nature of the oracle system in which pricing may vary across nodes for a variety of reasons.
    let beautifiedQuotes = responses.reduce((acc, providerResponse, index) => {
      for (const symbol in providerResponse) {
        let objLong = providerResponse[symbol]['Long']
        let objShort = providerResponse[symbol]['Short']

        if (!acc[symbol]) {
          acc[symbol] = {
            long: {
              price: objLong?.price ?? 0,
              fee: objLong?.fee ?? 0,
              closed: objLong?.is_close ?? false,
            },
            short: {
              price: objShort?.price ?? 0,
              fee: objShort?.fee ?? 0,
              closed: objShort?.is_close ?? false,
            },
            count_consensus: true,
            count: 0,
          }
        }

        acc[symbol]['count']++
      }
      return acc
    }, {})

    // Now check the logged count
    for (const symbol in beautifiedQuotes) {
      const o = beautifiedQuotes[symbol]
      const hasCorrectCount = o['count'] === responses.length
      o['count_consensus'] = hasCorrectCount ?? false
    }

    return beautifiedQuotes
  } catch (err) {
    console.log('Something went wrong while trying to fetch the quotes:')
    console.error(err)
    return {}
  }
}
