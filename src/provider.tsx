import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { SupportedChainId } from './constants/chains'
import store from './state/store'
import Updaters from './state/updaters'

export function Provider({
  chainId,
  partnerId,
  children,
}: {
  chainId: SupportedChainId
  partnerId: string
  children: React.ReactNode
}) {
  return (
    <ReduxProvider store={store}>
      <>
        <Updaters chainId={chainId} partnerId={partnerId} />
        {children}
      </>
    </ReduxProvider>
  )
}
