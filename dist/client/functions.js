"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareSignatureParams = void 0;

var prepareSignatureParams = function prepareSignatureParams() {
  var signatures = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var contract = arguments.length > 1 ? arguments[1] : undefined;
  var action = arguments.length > 2 ? arguments[2] : undefined;
  var minimumSignatures = arguments.length > 3 ? arguments[3] : undefined;

  try {
    if (!Array.isArray(signatures) || !signatures.length) {
      console.log('signatures: ', signatures);
      throw new Error('params @signatures is unusable');
    }

    if (!contract || typeof contract !== 'string') {
      console.log('contract: ', contract);
      throw new Error('param @contract is missing');
    }

    if (!action) {
      console.log('action: ', action);
      throw new Error('param @action is missing');
    }

    if (action !== 'buy' && action !== 'sell') {
      console.log('action: ', action);
      throw new Error('provided @action param is not supported');
    }

    if (typeof minimumSignatures !== 'number') {
      console.log('minimumSignatures: ', minimumSignatures);
      throw new Error('param @minimumSignatures is not a number');
    }

    signatures = extractContractSignatures(signatures, contract, action, minimumSignatures);

    if (signatures.length == 0 || signatures.length < minimumSignatures) {
      throw new Error("NOT ENOUGH SIGNATURES");
    } // signatures = sortSignatures(signatures, action)
    // if (signatures.length == 0 || signatures.length < minimumSignatures) {
    //   throw new Error("NOT ENOUGH SIGNATURES")
    // }
    // https://github.com/deusfinance/synchronizer-contracts/blob/master/contracts/Synchronizer.sol#L121


    return {
      multiplier: signatures[0].multiplier.toString(),
      fee: signatures[0].fee.toString(),
      blockNos: signatures.map(function (node) {
        return node.blockNo.toString();
      }),
      prices: signatures.map(function (node) {
        return node.price;
      }),
      v: signatures.map(function (node) {
        return node.signs[action].v.toString();
      }),
      r: signatures.map(function (node) {
        return node.signs[action].r.toString();
      }),
      s: signatures.map(function (node) {
        return node.signs[action].s.toString();
      })
    };
  } catch (err) {
    throw err;
  }
}; // function sortSignatures(signatures, action) {
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


exports.prepareSignatureParams = prepareSignatureParams;

function extractContractSignatures(signatures, contract, action, minimumSignatures) {
  try {
    return signatures.reduce(function (acc, nodeSignatures, index) {
      if (contract in nodeSignatures) {
        nodeSignatures[contract]['index'] = index;
        acc.push(nodeSignatures[contract]);
      }

      return acc;
    }, []);
  } catch (err) {
    console.log('Something went wrong while trying to extract the contract signatures:');
    console.error(err);
    return [];
  }
}