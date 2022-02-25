import { Percent, Token } from '@sushiswap/core-sdk'
import { SupportedChainId } from '../constants/chains'

export interface AddressMap {
  [x: string]: string
}

export interface TokenMap {
  [contract: string]: Token
}

/**
 * @param id Identifier according to the oracle
 * @param long contractAddress of LONG version
 * @param short contractAddress of SHORT version
 */
export interface RegistrarPair {
  id: string
  long: Registrar
  short: Registrar
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
  id: string
  chainId: SupportedChainId
  ticker: string
  symbol: string
  name: string
  sector: Sector
  direction: Direction
  contract: string
  sibling: string
  price: string
  fee: Percent
  open: boolean
  token: Token
}

export enum Direction {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export enum Sector {
  STOCKS = 'STOCKS',
  CRYPTO = 'CRYPTO',
  FOREX = 'FOREX',
  COMMODITIES = 'COMMODITIES',
  MISC = 'MISC',
}
