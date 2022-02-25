# Synchronizer SDK

A React + Redux based library written in Typescript to build your own decentralized stock exchange on top of DEUS Finance. Uses the DEUS Synchronizer V2 AMM and all its peripheral services.

## Install

`npm install @deusfinance/synchronizer-sdk`

## Usage

```javascript
// Import the library and instantiate it.
import { SynchronizerProvider, MuonClient } from '@deusfinance/synchronizer-sdk'

// Instantiate the Muon instance to gather oracle signatures
export const Muon = new MuonClient()

// Pass props that can be managed via hooks.
function SynchronizerInstance({ children }) {
  const { chainId } = someWeb3Context()
  const yourPartnerId = '0x302041dbeB23bc42eb33E85f1c0aE8d5bEDa716A'

  return (
    <SynchronizerProvider chainId={chainId} partnerId={yourPartnerId}>
      {children}
    </SynchronizerProvider>
  )
}

// Add the instance to your DOM tree.
ReactDOM.render(
  <React.StrictMode>
    <SynchronizerInstance>
      <YourApp />
    </SynchronizerInstance>
  </React.StrictMode>
  document.getElementById('root')
)
```

Then, you can start using all exported methods/hooks in your App. Hooks are simplified for as much as possible, meaning you won't have to do any additional logic to make sense out of data. For example, 'Registrars' have built-in oracle quotes, on-chain partnerFees and other metadata.

```javascript
import { useRegistrars, SupportedChainId } from '@deusfinance/synchronizer-sdk'

function YourApp() {
  const registrars = useRegistrars(SupportedChainId.FANTOM)

  return <div>Hi, mom!</div>
}
```

## Example

You can find a plug-and-play example React app in the [example](/example) directory.

## Contribute

To easen development, we're using the `yalc` package which allows us to symlink build-files into our example app. After installation, run `yalc publish` in the source dir. When building dist the symlink will be automatically created / updated. Now go into the /example directory, install the packages, and run `npm run yalc` to finish the symlink!

Hit `npm run start` to start the example app. Everytime you rebuild the source code, the live example repo will reflect the changes instantly.

## API Reference

#### Constants

```javascript
// Latest deployed addresses
addresses

// Enumerator of allowed chainIds
SupportedChainId

// Types
Percent
Token
Registrar
RegistrarPair
Direction
Sector
SignaturesData
IError
```

#### Signatures

```javascript
/**
 * Instantiate the Muon client
 * @param {optional} baseURL url to interact with the Muon Network, defaults to https://node-balancer.muon.net/v1
 * @param {optional} nSign minimum number of signatures required, defaults to 2
 */
const Muon = new MuonClient()

/**
 * Get signatures to pass to your smart contract call.
 * @param contract the contract address
 * @param action 'buy' or 'sell'
 * @param chainId the chain to get the signatures from
 * @returns Promise<SignaturesData | IError> => extract SignaturesData.calldata for further use
 */
Muon.getSignatures(contract: string, action: string, chainId: SupportedChainId)
```

#### Hooks

```javascript
/**
 * Any asset is split up into two versions of itself: LONG and SHORT, a RegistrarPair is an entity that holds both versions of the Registrar. Its 'id' is shared with both the Registrars, the id is commonly referred to as a 'ticker'.
 * @param chainId the chain to get the RegistrarPairs from
 * @returns RegistrarPair[]
 */
useRegistrarPairs(chainId: SupportedChainId)

/**
 * A list of individual Registrars, as per a flattened version of RegistrarPairs. A Registrar also holds a 'sibling' field, which refers to the other version of itself.
 * @param chainId the chain to get the Registrars from
 * @returns Registrar[]
 */
useRegistrars(chainId: SupportedChainId)

/**
 * Find a Registrar by its contract address.
 * @param contract the contract address
 * @param chainId the chain to get the Registrars from
 * @returns Registrar | undefined
 */
useRegistrarByContract(contract: string | undefined, chainId: SupportedChainId)

/**
 * A list of Registrars as instances of Sushiswap its Token standard
 * @param chainId the chain to get the Registrars from
 * @returns Token[]
 */
useRegistrarTokens(chainId: SupportedChainId)

/**
 * A mapping of RegistrarTokens, identified by their contract addresses.
 * @param chainId the chain to get the Registrars from
 * @returns TokenMap
 */
useRegistrarTokenMap(chainId: SupportedChainId)

/**
 * Callback functions to fetch the Fee for a given Registrar type set by the DEUS DAO and/or the Partner.
 * @param sector the Sector of the Registrar
 * @returns BigNumber bignumber.js instance which allows for easy math ops
 */
useTotalFeeCallback(sector: Sector)
usePlatformFeeCallback(sector: Sector)
usePartnerFeeCallback(sector: Sector)

/**
 * Quotes/oracle data is fetched once every 60 seconds. This callback forces a refresh.
 */
useForceRefreshCallback()
```
