"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeusClient = void 0;

var _index = require("./utils/index.js");

var _signatures = require("./oracles/signatures.js");

var _conducted = require("./oracles/conducted.js");

var _quotes = require("./oracles/quotes.js");

var _details = require("./oracles/details.js");

var _index2 = require("./constants/index.js");

class DeusClient {
  constructor({
    providerMapping = [],
    chainId = 1,
    options = {}
  } = {}) {
    this.providerMapping = providerMapping.map(provider => (0, _index.trimTrailingSlash)(provider));
    this.chainId = chainId;
    this.verbose = (options === null || options === void 0 ? void 0 : options.verbose) ?? false;

    this._sanitizeParams();
  }

  _sanitizeParams() {
    if (!this.providerMapping.length) throw new Error('providerMapping is an empty array');
    (0, _index.isSupportedChainId)(this.chainId);
  }

  setChainId(chainId) {
    (0, _index.isSupportedChainId)(chainId);
    return this.chainId = chainId;
  }

  async getSignatures(secondaryChainId) {
    let chainId = secondaryChainId ?? this.chainId;
    this.verbose && console.log(`Fetching signatures for chainId: ${chainId}`);
    (0, _index.isSupportedChainId)(chainId);
    return (0, _signatures.fetchSignatures)(this.providerMapping, chainId);
  }

  async getConducted(secondaryChainId) {
    let chainId = secondaryChainId ?? this.chainId;
    this.verbose && console.log(`Fetching conducted for chainId: ${chainId}`);
    (0, _index.isSupportedChainId)(chainId);
    return (0, _conducted.fetchConducted)(this.providerMapping, secondaryChainId ?? this.chainId);
  }

  async getQuotes(secondaryChainId) {
    let chainId = secondaryChainId ?? this.chainId;
    this.verbose && console.log(`Fetching quotes for chainId: ${chainId}`);
    (0, _index.isSupportedChainId)(chainId);
    return (0, _quotes.fetchQuotes)(this.providerMapping, secondaryChainId ?? this.chainId);
  }

  async getDetails() {
    this.verbose && console.log('Fetching registrar details');
    return (0, _details.fetchDetails)(this.providerMapping);
  }

  get constants() {
    return {
      SUPPORTED_CHAINS_BY_NAME: _index2.SUPPORTED_CHAINS_BY_NAME,
      SUPPORTED_CHAINS_BY_CHAIN_ID: _index2.SUPPORTED_CHAINS_BY_CHAIN_ID,
      SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID: _index2.SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID,
      ABI: _index2.ABI
    };
  }

  getMethods() {
    return [this.setChainId, this.getSignatures, this.getConducted, this.getQuotes, this.getDetails, this.constants];
  }

}

exports.DeusClient = DeusClient;