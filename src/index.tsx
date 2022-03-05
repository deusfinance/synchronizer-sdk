import { Collateral, Synchronizer, PartnerManager, Conductor, RoleChecker } from './constants/addresses'
import { SynchronizerABI, PartnerManagerABI, ConductorABI, RoleCheckerABI, RegistrarABI } from './constants/abi'

export const addresses = {
  Collateral,
  Conductor,
  PartnerManager,
  RoleChecker,
  Synchronizer,
}

export const abis = {
  Synchronizer: SynchronizerABI,
  PartnerManager: PartnerManagerABI,
  Conductor: ConductorABI,
  RoleChecker: RoleCheckerABI,
  Registrar: RegistrarABI,
}

export { Percent, Token } from '@sushiswap/core-sdk'
export { SupportedChainId } from './constants/chains'
export { MuonClient, SignaturesData } from './muon'

export {
  useRegistrars,
  useRegistrarPairs,
  useRegistrarByContract,
  useRegistrarTokens,
  useRegistrarTokenMap,
} from './hooks/useRegistrars'
export { useTotalFeeCallback, usePlatformFeeCallback, usePartnerFeeCallback } from './hooks/useFees'
export { useForceRefreshCallback } from './hooks/useApplication'

export { RegistrarPair, Registrar, Direction, Sector } from './types/index'
export { Provider as SynchronizerProvider } from './provider'
