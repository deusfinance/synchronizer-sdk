# Synchronizer SDK
A React + Redux based library to build your own decentralized stock exchange on top of DEUS Finance. Uses the DEUS Synchronizer V2 AMM and all its peripheral services.

## Install
`npm install @deusfinance/synchronizer-sdk`

## Usage
```javascript
// Import the library and instantiate it.
import { SynchronizerProvider } from '@deusfinance/synchronizer-sdk'

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
<React.StrictMode>
  <SynchronizerInstance>
    <YourApp />
  </SynchronizerInstance>
</React.StrictMode>
```

Then, you can start using all exported methods/hooks in your App. Hooks are simplified for as much as possible, meaning you won't have to do any additional logic to make sense out of data. For example, 'Registrars' have built-in oracle quotes, on-chain partnerFees and other metadata. 
```javascript
import { useRegistrars, SupportedChainId } from '@deusfinance/synchronizer-sdk'

function YourApp() {
  const registrars = useRegistrars(SupportedChainId.FANTOM)
  
  return (
    <div>
      Hi, mom!
    </div>
  )
}
```

## Example
You can find a plug-and-play example React app in the [example](/example) directory. The README + its content files contain elaborate comments to guide your further.

## Contribute
To easen development, we're using the `yalc` package which allows us to symlink build-files into our example app. After installation, run `yalc publish` in the source dir. When building dist the symlink will be automatically created / updated. Now go into the /example directory, install the packages, and run `npm run yalc` to finish the symlink!

Hit `npm run start` to start the example app. Everytime you rebuild the source code, the live example repo will reflect the changes instantly. 
