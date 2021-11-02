import { chainIdToNetworkName, makeHttpRequest } from '../utils/index.js'

export const fetchConducted = async (providerMapping, chainId) => {
  try {
    if (!providerMapping) {
      throw new Error('providerMapping is missing @fetchConducted')
    }
    if (!chainId) {
      throw new Error('chainId is missing @fetchConducted')
    }

    const networkName = chainIdToNetworkName(chainId)
    if (!networkName) throw new Error('networkName is null @fetchConducted')

    const promises = providerMapping.map(provider => {
      const url = `${provider}/${networkName}/conducted.json`
      return makeHttpRequest(url)
    })

    let responses = await Promise.allSettled(promises)

    // Modify output to default format to ensure easier cross-matching
    let modifiedResponses = responses.map(response => {
      if (response.status !== 'fulfilled') {
        throw new Error(`response.status returns unfulfilled: ${response}`)
      }
      let tokens = response?.value?.tokens ?? []
      return tokens.reduce((acc, o) => {
        acc[o.id] = {
          long: o.long,
          short: o.short,
        }
        return acc
      }, {})
    })

    // Check if there's consensus among nodes, e.g. symbols must be omnipresent + contain identical data
    let conductedWithConsensus = modifiedResponses.reduce((acc, providerResponse, index) => {
      for (const symbol in providerResponse) {
        let longValue = providerResponse[symbol]['long']
        let shortValue = providerResponse[symbol]['short']

        if (!acc[symbol]) {
          acc[symbol] = {
            long: longValue,
            short: shortValue,
            long_consensus: true,
            short_consensus: true,
            count_consensus: true,
            count: 0,
          }
        }

        // Check if this oracle's contracts matches the ones provided by the other oracles
        const hasMatchingLong = acc[symbol]['long'] === longValue
        const hasMatchingShort = acc[symbol]['short'] === shortValue

        // All the nodes must provide a response for this symbol, else its an anomaly as well
        acc[symbol]['count']++

        // Override truthy values if we've found anomalies, else don't override and leave it false.
        if (acc[symbol]['long_consensus']) {
          acc[symbol]['long_consensus'] = hasMatchingLong
        }
        if (acc[symbol]['short_consensus']) {
          acc[symbol]['short_consensus'] = hasMatchingShort
        }
      }
      return acc
    }, {})

    // Lastly, check if all symbols are entirely covered
    for (const symbol in conductedWithConsensus) {
      const o = conductedWithConsensus[symbol]
      const hasCorrectCount = o['count'] === responses.length
      o['count_consensus'] = hasCorrectCount ?? false
    }

    return conductedWithConsensus
  } catch (err) {
    console.log('Something went wrong while trying to fetch conducted:')
    console.error(err)
    return {}
  }
}
