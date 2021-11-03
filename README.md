# synchronizer-sdk
 An SDK to interact with the Synchronizer to build financial applications on top of DEUS Finance. This package supports ES6 and uses Babel transpilation for cross-browser support. 
 
### Install
Run `npm install @deusfinance/synchronizer-sdk`. You have to be on Node >=14.

### Getting Started
The client requires 1) a mapping of the oracle you'd like to use, 2) your starting chainId and 3) the minimum amount of signatures that need to be provided for the tx to be valid. Currently, oracle2 and oracle3 don't support `getDetails`, this is only temporary and will be fixed with our new oracle system (that is much more robust). However keep in mind that you still need 2 and 3 (or more!) for quotes + conducted + signatures. Using 2 and 3 will throw an innocent error when calling `getDetails`, which you can safely ignore. 

```
import { DeusClient } from '@deusfinance/synchronizer-sdk'

const providers = [
  'https://oracle1.deus.finance',
  'https://oracle2.deus.finance',
  'https://oracle3.deus.finance',
]
const defaultChainId = 1
const minimumSignatures = 1

const Client = new DeusClient({
  providers: providers,
  chainId: defaultChainId,
  minimumSignatures: minimumSignatures,
})
```

### How to Use
The client is simple in nature and only has getter functions, thus no internal caching. After initialization no data is automatically fetched or stored, they need to be called manually. This design was chosen because modern web frameworks are better equipped to handle caching and state management. However, the client allows the fetching of data across multiple chains despite the initial chainId param. You can see this at work via the Client.oracles[] functions.

## API Reference
```
**
* Get a list of all available functions.
* @returns {Object}
*/
Client.getMethods()
```

```
**
* Change the chainId post-initialization, keep in mind that data won't be refetched and will need to be triggered manually.
* @param {String} chainId - the chainId you're using for your app. Check Client.constants.SUPPORTED_CHAIN_IDS for the supported chains.
*/
Client.setChainId(chainid)
```

```
**
* Oracle signatures for all of the available assets on a specific chain. 
* @param {Number} secondaryChainId - OPTIONAL - provide a chainId that bypasses the originally provided chainId. 
* @returns {Array} - mapping of signatures per node, check Client.functions.prepareSignatureParams to handle the response.
*/
<async> Client.oracles.getSignatures(secondaryChainId)
```


```
**
* Get a list of all the available assets on a specific chain. In the event of a node lagging, the returned 'consensus' key will identify this.
* @param {Number} secondaryChainId - OPTIONAL - provide a chainId that bypasses the originally provided chainId. 
* @returns {Object}<String:Object> - hashtable of symbols and their respective long+short contracts.
*/
<async> Client.oracles.getConducted(secondaryChainId)
```
