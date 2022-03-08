import React from 'react'

import ConductedUpdater from './state/conducted/updater'
import DetailsUpdater from './state/details/updater'
import FeesUpdater from './state/fees/updater'
import QuotesUpdater from './state/quotes/updater'
import SignaturesUpdater from './state/signatures/updater'

export interface UpdaterProps {
  chainId: number
  partnerId: string
}

export default function Updater(props: UpdaterProps) {
  const { chainId, partnerId } = props
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
