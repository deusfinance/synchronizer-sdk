import { SupportedChainId } from './chains'
import { AddressMap } from '../types'

export const Collateral: AddressMap = {
  [SupportedChainId.FANTOM]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
}

export const Synchronizer: AddressMap = {
  [SupportedChainId.FANTOM]: '0x4Ae1B4863da16dE45e5Ab7f0B0d2D3Ad4242eD45',
}

export const PartnerManager: AddressMap = {
  [SupportedChainId.FANTOM]: '0xA1b701D07cc1566e3f07D8c273654CDeA9dad4a0',
}

export const Conductor: AddressMap = {
  [SupportedChainId.FANTOM]: '0x570d710d9f20599551246ec24d8a8ccffeb57ccf',
}

export const RoleChecker: AddressMap = {
  [SupportedChainId.FANTOM]: '0x8e6f8844b73dae005b02fd8776ee4719e7d5eb01',
}
