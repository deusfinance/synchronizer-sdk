import { throwErrorOnUnsupportedChainId } from '../utils/index.js'

export const isSupportedChainId = (chainId) => {
  try {
    throwErrorOnUnsupportedChainId(chainId)
    return true
  } catch (err) {
    return false
  }
}
