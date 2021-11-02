"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimTrailingSlash = exports.makeHttpRequest = exports.isSupportedChainId = exports.chainIdToNetworkName = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../constants/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_axios["default"].defaults.headers = _objectSpread(_objectSpread({}, _axios["default"].defaults.headers), {}, {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache'
});

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var options,
        response,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {
              crossdomain: true
            };
            _context.prev = 1;
            _context.next = 4;
            return _axios["default"].get(url, options);

          case 4:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
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

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function makeHttpRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeHttpRequest = makeHttpRequest;