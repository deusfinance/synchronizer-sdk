import { SynchronizerProvider, SupportedChainId, MuonClient } from '@deusfinance/synchronizer-sdk'

// This function mimics your web3 provider for demo purposes.
function someWeb3Context() {
  return {
    chainId: SupportedChainId.FANTOM,
  }
}

export const Muon = new MuonClient()

/**
 * The partnerId must be a valid Address. You can become a partner yourself via
 * the PartnerManager contract, which resulting address you should inject here.
 * The manager is exported as addresses.PartnerManager
 */
export default function Synchronizer({ children }: { children: React.ReactNode }) {
  const { chainId } = someWeb3Context()
  const partnerId = '0x302041dbeB23bc42eb33E85f1c0aE8d5bEDa716A'

  return (
    <SynchronizerProvider chainId={chainId} partnerId={partnerId}>
      {children}
    </SynchronizerProvider>
  )
}
