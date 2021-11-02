import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

import { SUPPORTED_CHAINS_BY_CHAIN_ID } from '../constants/index.js'

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export const trimTrailingSlash = (text) => {
  return text.replace(/\/$/, "")
}

export const isSupportedChainId = (chainId) => {
  if (!chainIdToNetworkName(chainId)) {
    throw new Error(`The provided chainId ${chainId} is not supported by the oracles`)
  }
  return true
}

export const chainIdToNetworkName = (chainId) => {
  return SUPPORTED_CHAINS_BY_CHAIN_ID[chainId] ? SUPPORTED_CHAINS_BY_CHAIN_ID[chainId].toLowerCase() : null
}

export const makeHttpRequest = async (url, options) => {
  try {
    let response = await axios.get(url, options)
    return response.data
  } catch (err) {
    console.log(`Error fetching ${url}: `)
    if (err.response) {
      // Request made and server responded
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    return null
  }
}
