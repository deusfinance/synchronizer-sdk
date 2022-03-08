import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store, SynchronizerUpdater } from './synchronizer'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SynchronizerUpdater />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
