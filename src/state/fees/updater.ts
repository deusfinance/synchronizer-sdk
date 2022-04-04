import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BigNumber } from '@ethersproject/bignumber'

import { usePartnerManager } from '../../hooks'
import { actions } from './slice'
import { SynchronizerChains } from '../../constants/chains'
import { Sector } from '../../types'

const ZERO = BigNumber.from('0')
const ZERO_MAP = [ZERO, ZERO, ZERO, ZERO]

export default function Updater({ chainId, partnerId }: { chainId: number; partnerId: string }): null {
  const dispatch = useDispatch()
  const PartnerManager = usePartnerManager(chainId)
  const [partnerFees, setPartnerFees] = useState(ZERO_MAP)
  const [platformFees, setPlatformFees] = useState(ZERO_MAP)

  const isSupported: boolean = useMemo(
    () => (chainId ? Object.values(SynchronizerChains).includes(chainId) : false),
    [chainId]
  )

  const partnerArgs = useMemo(
    () =>
      !isSupported
        ? []
        : [
            [partnerId, 0],
            [partnerId, 1],
            [partnerId, 2],
            [partnerId, 3],
          ],
    [isSupported, partnerId]
  )
  const platformArgs = useMemo(() => (!isSupported ? [] : [0, 1, 2, 3]), [isSupported])

  useEffect(() => {
    const fetchPartnerFees = async () => {
      try {
        const result = await Promise.all(
          partnerArgs.map((args) => {
            return PartnerManager.partnerFee(...args)
          })
        )
        if (result.length) {
          setPartnerFees(result)
        }
      } catch (err) {
        console.error('Unable to fetch PartnerFees: ', err)
        setPartnerFees(ZERO_MAP)
      }
    }
    if (PartnerManager && partnerArgs.length) {
      fetchPartnerFees()
    }
  }, [partnerArgs, PartnerManager])

  useEffect(() => {
    const fetchPlatformFees = async () => {
      try {
        const result = await Promise.all(
          platformArgs.map((val) => {
            return PartnerManager.minPlatformFee(val)
          })
        )
        if (result.length) {
          setPlatformFees(result)
        }
      } catch (err) {
        console.error('Unable to fetch PlatformFees: ', err)
        setPartnerFees(ZERO_MAP)
      }
    }
    if (PartnerManager && platformArgs.length) {
      fetchPlatformFees()
    }
  }, [platformArgs, PartnerManager])

  useEffect(() => {
    const [partnerStocks, partnerCrypto, partnerForex, partnerCommodity] = partnerFees
    const [platformStocks, platformCrypto, platformForex, platformCommodity] = platformFees
    // partner
    if (partnerStocks) {
      const fee = partnerStocks
      dispatch(
        actions.updatePartnerFee({
          [Sector.STOCKS]: fee.toString(),
        })
      )
    }
    if (partnerCrypto) {
      const fee = partnerCrypto
      dispatch(
        actions.updatePartnerFee({
          [Sector.CRYPTO]: fee.toString(),
        })
      )
    }
    if (partnerForex) {
      const fee = partnerForex
      dispatch(
        actions.updatePartnerFee({
          [Sector.FOREX]: fee.toString(),
        })
      )
    }
    if (partnerCommodity) {
      const fee = partnerCommodity
      dispatch(
        actions.updatePartnerFee({
          [Sector.COMMODITIES]: fee.toString(),
        })
      )
    }
    // platform
    if (platformStocks) {
      const fee = platformStocks
      dispatch(
        actions.updatePlatformFee({
          [Sector.STOCKS]: fee.toString(),
        })
      )
    }
    if (platformCrypto) {
      const fee = platformCrypto
      dispatch(
        actions.updatePlatformFee({
          [Sector.CRYPTO]: fee.toString(),
        })
      )
    }
    if (platformForex) {
      const fee = platformForex
      dispatch(
        actions.updatePlatformFee({
          [Sector.FOREX]: fee.toString(),
        })
      )
    }
    if (platformCommodity) {
      const fee = platformCommodity
      dispatch(
        actions.updatePlatformFee({
          [Sector.COMMODITIES]: fee.toString(),
        })
      )
    }
  }, [dispatch, platformFees, partnerFees])

  return null
}
