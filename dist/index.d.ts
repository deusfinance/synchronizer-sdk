export declare const addresses: {
    Collateral: import("./types").AddressMap;
    Conductor: import("./types").AddressMap;
    PartnerManager: import("./types").AddressMap;
    RoleChecker: import("./types").AddressMap;
    Synchronizer: import("./types").AddressMap;
};
export { Percent, Token } from '@sushiswap/core-sdk';
export { SupportedChainId } from './constants/chains';
export { MuonClient, SignaturesData } from './muon';
export { useRegistrars, useRegistrarPairs, useRegistrarByContract, useRegistrarTokens, useRegistrarTokenMap, } from './hooks/useRegistrars';
export { useTotalFeeCallback, usePlatformFeeCallback, usePartnerFeeCallback } from './hooks/useFees';
export { useForceRefreshCallback } from './hooks/useApplication';
export { RegistrarPair, Registrar, Direction, Sector } from './types/index';
export { Provider as SynchronizerProvider } from './provider';
