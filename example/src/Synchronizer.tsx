import { createSynchronizer, SupportedChainId, MuonClient } from '@deusfinance/synchronizer-sdk'
import { configureStore } from '@reduxjs/toolkit'

// This function mimics your web3 provider for demo purposes.
function someWeb3Context() {
  return {
    chainId: SupportedChainId.FANTOM,
  }
}

export const Muon = new MuonClient()

const synchronizer = createSynchronizer()

export const store = configureStore({
  reducer: {
    // destruct the slices into your reducer
    ...synchronizer.slices,
  },
})

export const hooks = synchronizer.hooks

/**
 * The partnerId must be a valid Address. You can become a partner yourself via
 * the PartnerManager contract, which resulting address you should inject here.
 * The manager is exported as addresses.PartnerManager
 */
export function SynchronizerUpdater() {
  const { chainId } = someWeb3Context()
  const partnerId = '0x1164fe7a76D22EAA66f6A0aDcE3E3a30d9957A5f'

  return <synchronizer.Updater chainId={chainId} partnerId={partnerId} />
}
