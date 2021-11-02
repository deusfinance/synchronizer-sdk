"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimTrailingSlash = exports.makeHttpRequest = exports.isSupportedChainId = exports.chainIdToNetworkName = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _axiosCacheAdapter = require("axios-cache-adapter");

var _index = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_axios["default"].defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
};

var trimTrailingSlash = function trimTrailingSlash(text) {
  return text.replace(/\/$/, "");
};

exports.trimTrailingSlash = trimTrailingSlash;

var isSupportedChainId = function isSupportedChainId(chainId) {
  if (!chainIdToNetworkName(chainId)) {
    throw new Error("The provided chainId ".concat(chainId, " is not supported by the oracles"));
  }

  return true;
};

exports.isSupportedChainId = isSupportedChainId;

var chainIdToNetworkName = function chainIdToNetworkName(chainId) {
  return _index.SUPPORTED_CHAINS_BY_CHAIN_ID[chainId] ? _index.SUPPORTED_CHAINS_BY_CHAIN_ID[chainId].toLowerCase() : null;
};

exports.chainIdToNetworkName = chainIdToNetworkName;

var makeHttpRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, options) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get(url, options);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("Error fetching ".concat(url, ": "));

            if (_context.t0.response) {
              // Request made and server responded
              console.log(_context.t0.response.data);
              console.log(_context.t0.response.status);
              console.log(_context.t0.response.headers);
            } else if (_context.t0.request) {
              // The request was made but no response was received
              console.log(_context.t0.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', _context.t0.message);
            }

            return _context.abrupt("return", null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function makeHttpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeHttpRequest = makeHttpRequest;