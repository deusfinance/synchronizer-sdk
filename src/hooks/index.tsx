import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'

import { PartnerManager } from '../constants/addresses'
import { PartnerManagerABI } from '../constants/abi/PartnerManager'
import { Providers } from '../constants/providers'

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
