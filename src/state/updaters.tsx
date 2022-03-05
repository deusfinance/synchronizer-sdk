import React from 'react'

import ConductedUpdater from './conducted/updater'
import DetailsUpdater from './details/updater'
import FeesUpdater from './fees/updater'
import QuotesUpdater from './quotes/updater'
import SignaturesUpdater from './signatures/updater'

export interface UpdaterProps {
  chainId: number
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
