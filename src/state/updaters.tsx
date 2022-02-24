import React from 'react'

import { SupportedChainId } from '../constants/chains'
import ConductedUpdater from './conducted/updater'
import DetailsUpdater from './details/updater'
import FeesUpdater from './fees/updater'
import QuotesUpdater from './quotes/updater'
import SignaturesUpdater from './signatures/updater'

export interface UpdaterProps {
  chainId: SupportedChainId
  partnerId: string
}

export default function Updaters({ chainId, partnerId }: UpdaterProps) {
  return (
    <>
      <ConductedUpdater />
      <DetailsUpdater />
      <FeesUpdater chainId={chainId} partnerId={partnerId} />
      <QuotesUpdater />
      <SignaturesUpdater />
    </>
  )
}
