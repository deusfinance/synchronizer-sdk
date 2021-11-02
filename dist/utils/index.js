"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimTrailingSlash = exports.makeHttpRequest = exports.isSupportedChainId = exports.chainIdToNetworkName = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _axiosCacheAdapter = require("axios-cache-adapter");

var _index = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios.default.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
};

const trimTrailingSlash = text => {
  return text.replace(/\/$/, "");
};

exports.trimTrailingSlash = trimTrailingSlash;

const isSupportedChainId = chainId => {
  if (!chainIdToNetworkName(chainId)) {
    throw new Error(`The provided chainId ${chainId} is not supported by the oracles`);
  }

  return true;
};

exports.isSupportedChainId = isSupportedChainId;

const chainIdToNetworkName = chainId => {
  return _index.SUPPORTED_CHAINS_BY_CHAIN_ID[chainId] ? _index.SUPPORTED_CHAINS_BY_CHAIN_ID[chainId].toLowerCase() : null;
};

exports.chainIdToNetworkName = chainIdToNetworkName;

const makeHttpRequest = async (url, options) => {
  try {
    let response = await _axios.default.get(url, options);
    return response.data;
  } catch (err) {
    console.log(`Error fetching ${url}: `);

    if (err.response) {
      // Request made and server responded
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }

    return null;
  }
};

exports.makeHttpRequest = makeHttpRequest;