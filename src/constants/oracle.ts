// @ts-ignore
import { SupportedChainId } from './chains'
// const Muon = require('muon').default

export const INFO_BASE_URL = new URL('https://oracle1.deus.finance')

export const ORACLE_NETWORK_NAMES: { [chainId: number]: string } = {
  [SupportedChainId.FANTOM]: 'fantom',
}

// export const MuonClient = new Muon('https://node-balancer.muon.net/v1/')
export const MuonClient = true

// https://github.com/muon-protocol/muon-node-js/blob/7fb51305f7a4315bf3a4e3d2e258ba37bb4111e3/utils/node-utils/eth.js
export const MUON_NETWORK_NAMES: { [chainId: number]: string } = {
  [SupportedChainId.FANTOM]: 'fantom',
}
