import React from 'react'
import ReactDOM from 'react-dom'

import Synchronizer from './lib/synchronizer/instance'
import App from './App'

// Make sure the SynchronizerProvider is injected below the web3 context provider.
// It has its own built-in store, so you don't have to combine reducers.
ReactDOM.render(
  <React.StrictMode>
    <Synchronizer>
      <App />
    </Synchronizer>
  </React.StrictMode>,
  document.getElementById('root')
)