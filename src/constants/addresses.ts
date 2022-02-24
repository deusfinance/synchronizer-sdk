import { SupportedChainId } from './chains'
import { AddressMap } from '../types'

export const Multicall2: AddressMap = {
  [SupportedChainId.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
}

export const Collateral: AddressMap = {
  [SupportedChainId.FANTOM]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
}

export const Synchronizer: AddressMap = {
  [SupportedChainId.FANTOM]: '0x71EB0bCFeB9610a79af007531aEeeE7848e76E71',
}

export const PartnerManager: AddressMap = {
  [SupportedChainId.FANTOM]: '0x6796a6b39f2c8FF2bEfa223aC6eeD13a4d693ba4',
}

export const Conductor: AddressMap = {
  [SupportedChainId.FANTOM]: '0x570d710d9f20599551246ec24d8a8ccffeb57ccf',
}

export const RoleChecker: AddressMap = {
  [SupportedChainId.FANTOM]: '0x8e6f8844b73dae005b02fd8776ee4719e7d5eb01',
}
