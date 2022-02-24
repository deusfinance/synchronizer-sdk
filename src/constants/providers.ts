import { JsonRpcProvider } from '@ethersproject/providers'

import { SupportedChainId } from './chains'

export const Providers: { [chainId: number]: JsonRpcProvider } = {
  [SupportedChainId.FANTOM]: new JsonRpcProvider('https://rpc.ftm.tools'),
}
