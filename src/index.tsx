import { Collateral, Synchronizer, PartnerManager, Conductor, RoleChecker } from './constants/addresses'

export const addresses = {
  Collateral,
  Conductor,
  PartnerManager,
  RoleChecker,
  Synchronizer,
}

export { Percent, Token } from '@sushiswap/core-sdk'
export { SupportedChainId } from './constants/chains'
export { MuonClient } from './constants/oracle'

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
