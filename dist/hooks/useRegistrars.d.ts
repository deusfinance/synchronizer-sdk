import { Token } from '@sushiswap/core-sdk';
import { SupportedChainId } from '../constants/chains';
import { TokenMap, Registrar, RegistrarPair } from '../types';
/**
 * A list of all conducted assets supported by DEUS, where longs/shorts are considered siblings.
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of paired Registrars
 */
export declare function useRegistrarPairs(chainId: SupportedChainId): RegistrarPair[];
/**
 * A list of all conducted assets supported by DEUS, where longs/shorts are returned individually.
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of single Registrars
 */
export declare function useRegistrars(chainId: SupportedChainId): Registrar[];
/**
 * Find a Registrar by its contract, ignores checksums
 * @param contract the registrarContract
 * @param chainId chainId supported by the Synchronizer
 * @returns found Registrar or undefined
 */
export declare function useRegistrarByContract(contract: string | undefined, chainId: SupportedChainId): Registrar | undefined;
/**
 * Return Registrars as instances of Sushiswap's Token standard
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of Tokens by their respective contracts
 */
export declare function useRegistrarTokenMap(chainId: SupportedChainId): TokenMap;
/**
 * Return Registrars as instances of Sushiswap's Token standard
 * @param chainId chainId supported by the Synchronizer
 * @returns list of Tokens
 */
export declare function useRegistrarTokens(chainId: SupportedChainId): Token[];
