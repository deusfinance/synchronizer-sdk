import { useEffect, useMemo, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useAppDispatch } from '../store'

import { usePartnerManager } from '../../hooks'
import { updatePlatformFee, updatePartnerFee } from './reducer'
import { SynchronizerChains } from '../../constants/chains'
import { Sector } from '../../types'

const ZERO = BigNumber.from('0')
const ZERO_MAP = [ZERO, ZERO, ZERO]

export default function Updater({ chainId, partnerId }: { chainId: number; partnerId: string }): null {
  const dispatch = useAppDispatch()
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
          ],
    [isSupported, partnerId]
  )
  const platformArgs = useMemo(() => (!isSupported ? [] : [0, 1, 2]), [isSupported])

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
            return PartnerManager.platformFee(val)
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
    const [partnerStocks, partnerCrypto, partnerForex] = partnerFees
    const [platformStocks, platformCrypto, platformForex] = platformFees
    // partner
    if (partnerStocks) {
      const fee = partnerStocks
      dispatch(
        updatePartnerFee({
          [Sector.STOCKS]: fee.toString(),
        })
      )
    }
    if (partnerCrypto) {
      const fee = partnerCrypto
      dispatch(
        updatePartnerFee({
          [Sector.CRYPTO]: fee.toString(),
        })
      )
    }
    if (partnerForex) {
      const fee = partnerForex
      dispatch(
        updatePartnerFee({
          [Sector.FOREX]: fee.toString(),
        })
      )
    }
    // platform
    if (platformStocks) {
      const fee = platformStocks
      dispatch(
        updatePlatformFee({
          [Sector.STOCKS]: fee.toString(),
        })
      )
    }
    if (platformCrypto) {
      const fee = platformCrypto
      dispatch(
        updatePlatformFee({
          [Sector.CRYPTO]: fee.toString(),
        })
      )
    }
    if (platformForex) {
      const fee = platformForex
      dispatch(
        updatePlatformFee({
          [Sector.FOREX]: fee.toString(),
        })
      )
    }
  }, [dispatch, platformFees, partnerFees])

  return null
}
