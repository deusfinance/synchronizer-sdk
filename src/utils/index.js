import fetch from 'isomorphic-unfetch';

import { SUPPORTED_CHAINS_BY_CHAIN_ID } from '../constants/index.js'

export const trimTrailingSlash = (text) => {
  return text.replace(/\/$/, "")
}

export const throwErrorOnUnsupportedChainId = (chainId) => {
  if (!chainIdToNetworkName(chainId)) {
    throw new Error(`The provided chainId ${chainId} is not supported by the oracles`)
  }
  return true
}

export const chainIdToNetworkName = (chainId) => {
  return SUPPORTED_CHAINS_BY_CHAIN_ID[chainId] ? SUPPORTED_CHAINS_BY_CHAIN_ID[chainId].toLowerCase() : null
}

export const makeHttpRequest = async (url, options = {
  cache: 'no-cache'
}) => {
  try {
    let response = await fetch(url, options)
    return await response.json()
  } catch (err) {
    console.log(`Error fetching ${url}: `)
    console.error(err)
    return null
  }
}
