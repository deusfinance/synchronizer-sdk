import { useMemo } from 'react'
import { Token } from '@sushiswap/core-sdk'
import { find } from 'lodash'
import { getAddress } from '@ethersproject/address'

import { constructPercentage } from '../utils/prices'
import { TokenMap, Registrar, RegistrarPair, Sector, Direction } from '../types'

import { useQuotesState } from '../state/quotes/slice'
import { useConductedState } from '../state/conducted/slice'
import { useSignaturesState } from '../state/signatures/slice'
import { useDetailsState } from '../state/details/slice'
import { useTotalFeeCallback } from '../state/fees/hooks'

function sortAlphabetically(x: Registrar, y: Registrar) {
  if (x.ticker < y.ticker) {
    return -1
  }
  if (x.ticker > y.ticker) {
    return 1
  }
  return 0
}

/**
 * A list of all conducted assets supported by DEUS, where longs/shorts are considered siblings.
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of paired Registrars
 */
export function useRegistrarPairs(chainId: number): RegistrarPair[] {
  const { conducted } = useConductedState()
  const { quotes } = useQuotesState()
  const { signatures } = useSignaturesState()
  const { details } = useDetailsState()
  const getFee = useTotalFeeCallback()

  const [stockFee, cryptoFee, forexFee] = useMemo(() => {
    return [getFee(Sector.STOCKS).toNumber(), getFee(Sector.CRYPTO).toNumber(), getFee(Sector.FOREX).toNumber()]
  }, [getFee])

  return useMemo(() => {
    if (!chainId || !conducted[chainId] || !quotes[chainId] || !signatures[chainId] || !details) return []

    return conducted[chainId]
      .map(({ id, long, short }) => {
        const quote = quotes[chainId][id]
        const longSigs = signatures[chainId][long]
        const shortSigs = signatures[chainId][short]
        const asset = details[id]

        if (!asset || !quote || !quote.long || !quote.short) {
          return null
        }

        const fee = asset.sector === Sector.STOCKS ? stockFee : asset.sector === Sector.CRYPTO ? cryptoFee : forexFee

        const longRegistrar: Registrar = {
          id,
          chainId,
          ticker: asset.symbol,
          name: asset.name,
          sector: asset.sector,
          direction: Direction.LONG,
          contract: getAddress(long),
          sibling: short,
          symbol: asset.longSymbol,
          price: quote.long.price,
          fee: constructPercentage(fee),
          open: !!longSigs,
          token: new Token(chainId, getAddress(long), 18, asset.symbol, asset.name),
        }

        const shortRegistrar: Registrar = {
          id,
          chainId,
          ticker: asset.symbol,
          name: asset.name,
          sector: asset.sector,
          direction: Direction.SHORT,
          contract: getAddress(short),
          sibling: long,
          symbol: asset.shortSymbol,
          price: quote.short.price,
          fee: constructPercentage(fee),
          open: !!shortSigs,
          token: new Token(chainId, getAddress(short), 18, asset.symbol, asset.name),
        }

        return {
          id,
          long: longRegistrar,
          short: shortRegistrar,
        }
      })
      .filter((o) => o) as RegistrarPair[]
  }, [chainId, details, conducted, quotes, signatures, stockFee, cryptoFee, forexFee])
}

/**
 * A list of all conducted assets supported by DEUS, where longs/shorts are returned individually.
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of single Registrars
 */
export function useRegistrars(chainId: number): Registrar[] {
  const registrars = useRegistrarPairs(chainId)
  return useMemo(() => {
    return registrars
      .reduce((acc: Registrar[], pair: RegistrarPair) => {
        acc.push(...[pair.long, pair.short])
        return acc
      }, [])
      .sort(sortAlphabetically)
  }, [registrars])
}

/**
 * Find a Registrar by its contract, ignores checksums
 * @param contract the registrarContract
 * @param chainId chainId supported by the Synchronizer
 * @returns found Registrar or undefined
 */
export function useRegistrarByContract(contract: string | undefined, chainId: number): Registrar | undefined {
  const registrars = useRegistrars(chainId)
  return useMemo(() => {
    if (!contract) return undefined
    const registrar: Registrar | undefined = find(
      registrars,
      (obj) => obj.contract.toUpperCase() === contract.toUpperCase()
    )
    return registrar ?? undefined
  }, [contract, registrars])
}

/**
 * Return Registrars as instances of Sushiswap's Token standard
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of Tokens by their respective contracts
 */
export function useRegistrarTokenMap(chainId: number): TokenMap {
  const registrars = useRegistrars(chainId)
  return useMemo(
    () =>
      registrars.reduce((acc: TokenMap, registrar) => {
        acc[registrar.contract] = registrar.token
        return acc
      }, {}),
    [registrars]
  )
}

/**
 * Return Registrars as instances of Sushiswap's Token standard
 * @param chainId chainId supported by the Synchronizer
 * @returns list of Tokens
 */
export function useRegistrarTokens(chainId: number): Token[] {
  const registrars = useRegistrars(chainId)
  return useMemo(() => registrars.map((registrar) => registrar.token), [registrars])
}
