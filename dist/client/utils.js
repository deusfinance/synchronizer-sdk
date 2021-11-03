"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedChainId = void 0;

var _index = require("../utils/index.js");

var isSupportedChainId = function isSupportedChainId(chainId) {
  try {
    (0, _index.throwErrorOnUnsupportedChainId)(chainId);
    return true;
  } catch (err) {
    return false;
  }
};

exports.isSupportedChainId = isSupportedChainId;