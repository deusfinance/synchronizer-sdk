import React from 'react'

import { useRegistrars, SupportedChainId, Registrar, useForceRefresh } from '@deusfinance/synchronizer-sdk'

/*
 * Internal data is updated once every 60 secondes. If you want access to the
 * latest information - for instance a real-time oracle quote - you could
 * call forceRefresh.
 */
export default function App() {
  const list = useRegistrars(SupportedChainId.FANTOM)
  const forceRefresh = useForceRefresh()

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        margin: '50px 10%',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={forceRefresh}
        style={{
          margin: '50px auto',
        }}
      >
        Click to force a refresh (check the console for feedback)
      </div>
      <table>
        <thead>
          <tr>
            <td>ticker</td>
            <td>name</td>
            <td>type</td>
            <td>sector</td>
            <td>fee</td>
            <td>price</td>
            <td>state</td>
            <td>contract</td>
            <td>sibling</td>
          </tr>
        </thead>
        <tbody>
          {list.map((registrar: Registrar, index) => (
            <tr key={index}>
              <td>{registrar.ticker}</td>
              <td>{registrar.name}</td>
              <td>{registrar.direction}</td>
              <td>{registrar.sector}</td>
              <td>{registrar.fee.toSignificant()}%</td>
              <td>{registrar.price}</td>
              <td>{registrar.open ? '' : 'Market is Closed'}</td>
              <td>{registrar.contract}</td>
              <td>{registrar.sibling}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
