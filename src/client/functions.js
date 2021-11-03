export const prepareSignatureParams = (signatures = [], contract, action, minimumSignatures) => {
  try {
    if (!Array.isArray(signatures) || !signatures.length) {
      console.log('signatures: ', signatures);
      throw new Error('params @signatures is unusable')
    }

    if (!contract || typeof contract !== 'string') {
      console.log('contract: ', contract);
      throw new Error('param @contract is missing')
    }

    if (!action) {
      console.log('action: ', action);
      throw new Error('param @action is missing')
    }

    if (action !== 'buy' && action !== 'sell') {
      console.log('action: ', action);
      throw new Error('provided @action param is not supported')
    }

    if (typeof minimumSignatures !== 'number') {
      console.log('minimumSignatures: ', minimumSignatures);
      throw new Error('param @minimumSignatures is not a number')
    }

    signatures = extractContractSignatures(signatures, contract, action, minimumSignatures)
    if (signatures.length == 0 || signatures.length < minimumSignatures) {
      throw new Error("NOT ENOUGH SIGNATURES")
    }

    // signatures = sortSignatures(signatures, action)
    // if (signatures.length == 0 || signatures.length < minimumSignatures) {
    //   throw new Error("NOT ENOUGH SIGNATURES")
    // }

    // https://github.com/deusfinance/synchronizer-contracts/blob/master/contracts/Synchronizer.sol#L121
    return {
      multiplier: signatures[0].multiplier.toString(),
      fee: signatures[0].fee.toString(),
      blockNos: signatures.map(node => node.blockNo.toString()),
      prices: signatures.map(node => node.price),
      v: signatures.map(node => node.signs[action].v.toString()),
      r: signatures.map(node => node.signs[action].r.toString()),
      s: signatures.map(node => node.signs[action].s.toString()),
    }

  } catch (err) {
    throw err
  }
}

// function sortSignatures(signatures, action) {
//   try {
//     switch (action) {
//       case 'buy':
//         return signatures.sort(comparePrice)
//     }
//   } catch (err) {
//     console.log('Something went wrong while trying to sort the contract signatures:')
//     console.error(err)
//     return []
//   }
// }

function extractContractSignatures(signatures, contract, action, minimumSignatures) {
  try {
    return signatures.reduce((acc, nodeSignatures, index) => {
      if (contract in nodeSignatures) {
        nodeSignatures[contract]['index'] = index
        acc.push(nodeSignatures[contract])
      }
      return acc
    }, [])
  } catch (err) {
    console.log('Something went wrong while trying to extract the contract signatures:')
    console.error(err)
    return []
  }
}
