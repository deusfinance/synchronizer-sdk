"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchQuotes = void 0;

var _index = require("../utils/index.js");

const fetchQuotes = async (providerMapping, chainId) => {
  try {
    if (!providerMapping) {
      throw new Error('providerMapping is missing @fetchQuotes');
    }

    if (!chainId) {
      throw new Error('chainId is missing @fetchQuotes');
    }

    const networkName = (0, _index.chainIdToNetworkName)(chainId);
    if (!networkName) throw new Error('networkName is null @fetchQuotes');
    const promises = providerMapping.map(provider => {
      const url = `${provider}/${networkName}/price.json`;
      return (0, _index.makeHttpRequest)(url);
    });
    let responses = await Promise.allSettled(promises);
    responses = responses.map(response => {
      if (response.status === 'fulfilled') return (response === null || response === void 0 ? void 0 : response.value) ?? {};
      throw new Error(`response.status returns unfulfilled: ${response}`);
    }); // Beautify + check if all nodes provide the same symbols by logging `count`, however we DON'T check for data anomalies,
    // due to the nature of the oracle system in which pricing may vary across nodes for a variety of reasons.

    let beautifiedQuotes = responses.reduce((acc, providerResponse, index) => {
      for (const symbol in providerResponse) {
        let objLong = providerResponse[symbol]['Long'];
        let objShort = providerResponse[symbol]['Short'];

        if (!acc[symbol]) {
          acc[symbol] = {
            long: {
              price: (objLong === null || objLong === void 0 ? void 0 : objLong.price) ?? 0,
              fee: (objLong === null || objLong === void 0 ? void 0 : objLong.fee) ?? 0,
              closed: (objLong === null || objLong === void 0 ? void 0 : objLong.is_close) ?? false
            },
            short: {
              price: (objShort === null || objShort === void 0 ? void 0 : objShort.price) ?? 0,
              fee: (objShort === null || objShort === void 0 ? void 0 : objShort.fee) ?? 0,
              closed: (objShort === null || objShort === void 0 ? void 0 : objShort.is_close) ?? false
            },
            count_consensus: true,
            count: 0
          };
        }

        acc[symbol]['count']++;
      }

      return acc;
    }, {}); // Now check the logged count

    for (const symbol in beautifiedQuotes) {
      const o = beautifiedQuotes[symbol];
      const hasCorrectCount = o['count'] === responses.length;
      o['count_consensus'] = hasCorrectCount ?? false;
    }

    return beautifiedQuotes;
  } catch (err) {
    console.log('Something went wrong while trying to fetch the quotes:');
    console.error(err);
    return {};
  }
};

exports.fetchQuotes = fetchQuotes;