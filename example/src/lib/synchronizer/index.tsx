// @ts-nocheck

// this file has no purpose other than showcasing the entire export map
export {
  // provider instance to add to your component tree
  SynchronizerProvider,
  // relevant deployed addresses
  addresses,
  // allowed chainIds
  SupportedChainId,
  // client to fetch contract signatures from
  MuonClient,
  // hooks
  useRegistrarPairs,
  useRegistrars,
  useRegistrarTokens,
  useRegistrarTokenMap,
  useRegistrarByContract,
  useTotalFeeCallback,
  usePlatformFeeCallback,
  usePartnerFeeCallback,
  useForceRefresh,
  // types
  Percent,
  Token,
  Registrar,
  RegistrarPair,
  Direction,
  Sector,
} from '@deusfinance/synchronizer-sdk'
