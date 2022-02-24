import { Percent, Token } from '@sushiswap/core-sdk';
import { SupportedChainId } from '../constants/chains';
export interface AddressMap {
    [x: string]: string;
}
export interface TokenMap {
    [contract: string]: Token;
}
/**
 * @param id Identifier according to the oracle
 * @param long contractAddress of LONG version
 * @param short contractAddress of SHORT version
 */
export interface RegistrarPair {
    id: string;
    long: Registrar;
    short: Registrar;
}
/**
 * @param id Identifier according to the oracle
 * @param ticker official ticker, usually same as id
 * @param symbol symbol as per the direction (long or short)
 * @param name contract name as per mint constructor
 * @param sector crypto or stock
 * @param direction direction (long or short)
 * @param contract the contract address
 * @param sibling contract address of the asset in opposite direction
 * @param price latest quote provided by the oracle
 * @param fee latest fee provided by the oracle
 * @param open if asset is tradeable
 */
export interface Registrar {
    id: string;
    chainId: SupportedChainId;
    ticker: string;
    symbol: string;
    name: string;
    sector: Sector;
    direction: Direction;
    contract: string;
    sibling: string;
    price: string;
    fee: Percent;
    open: boolean;
    token: Token;
}
export declare enum Direction {
    LONG = "LONG",
    SHORT = "SHORT"
}
export declare enum Sector {
    STOCKS = "STOCKS",
    CRYPTO = "CRYPTO",
    FOREX = "FOREX",
    COMMODITIES = "COMMODITIES",
    MISC = "MISC"
}
export interface MuonResponse {
    success?: boolean;
    app: string;
    cid: string;
    confirmed: boolean;
    confirmedAt: number;
    data: {
        init: {
            none: string;
            nonceAddress: string;
            party: string;
        };
        params: {
            action: string;
            chain: string;
            tokenId: string;
            useMultiplier: boolean;
        };
        result: {
            action: string;
            address: string;
            chain: string;
            expireBlock: number;
            multiplier: number;
            price: string;
        };
    };
    method: string;
    nSign: number;
    owner: string;
    peerId: string;
    reqId: string;
    signatures: {
        owner: string;
        ownerPubKey: {
            x: string;
            yParity: string;
        };
        result: {
            action: string;
            address: string;
            chain: string;
            expireBlock: number;
            price: string;
        };
        signature: string;
        timestamp: number;
    }[];
    sigs: Array<{
        nonce: string;
        owner: string;
        signature: string;
    }>;
    startedAt: number;
    _id: string;
}
