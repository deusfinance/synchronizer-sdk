import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'

import { Multicall2, PartnerManager } from '../constants/addresses'
import Multicall2ABI from '../constants/abi/MULTICALL2.json'
import PartnerManagerABI from '../constants/abi/PARTNER_MANAGER.json'
import { Providers } from '../constants/providers'

export function useMulticall2(chainId: number) {
  const address = useMemo(() => {
    return chainId && chainId in Multicall2 ? Multicall2[chainId] : Multicall2[250]
  }, [chainId])
  return useContract(chainId, address, Multicall2ABI)
}

export function usePartnerManager(chainId: number) {
  const address = useMemo(() => {
    return chainId && chainId in PartnerManager ? PartnerManager[chainId] : PartnerManager[250]
  }, [chainId])
  return useContract(chainId, address, PartnerManagerABI)
}

function useContract(chainId: number, address: string, ABI: any) {
  const provider = useProvider(chainId)
  return useMemo(() => {
    return new Contract(address, ABI, provider)
  }, [address, ABI, provider])
}

function useProvider(chainId: number) {
  return useMemo(() => {
    return chainId && chainId in Providers ? Providers[chainId] : Providers[250]
  }, [chainId])
}
