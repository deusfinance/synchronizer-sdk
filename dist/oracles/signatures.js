"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSignatures = void 0;

var _index = require("../utils/index.js");

const fetchSignatures = async (providerMapping, chainId) => {
  try {
    if (!providerMapping) {
      throw new Error('providerMapping is missing @fetchSignatures');
    }

    if (!chainId) {
      throw new Error('chainId is missing @fetchSignatures');
    }

    const networkName = (0, _index.chainIdToNetworkName)(chainId);
    if (!networkName) throw new Error('networkName is null @fetchSignatures');
    const promises = providerMapping.map(provider => {
      const url = `${provider}/${networkName}/signatures.json`;
      return (0, _index.makeHttpRequest)(url);
    });
    let responses = await Promise.allSettled(promises);
    return responses.map(response => {
      if (response.status === 'fulfilled') return (response === null || response === void 0 ? void 0 : response.value) ?? {};
      throw new Error(`response.status returns unfulfilled: ${response}`);
    });
  } catch (err) {
    console.log('Something went wrong while trying to fetch the signatures:');
    console.error(err);
    return {};
  }
};

exports.fetchSignatures = fetchSignatures;