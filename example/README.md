### Setup
`npm run install` and then `npm run yalc` to setup symlinks, followed by `npm run start` to run your app in development mode.

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
```

#### Instances
```javascript
// Provider instance to add to your component tree
SynchronizerProvider

// Client to fetch trade signatures from
MuonClient
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
useForceRefresh()
```

