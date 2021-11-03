"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimTrailingSlash = exports.throwErrorOnUnsupportedChainId = exports.makeHttpRequest = exports.chainIdToNetworkName = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isomorphicUnfetch = _interopRequireDefault(require("isomorphic-unfetch"));

var _index = require("../constants/index.js");

var trimTrailingSlash = function trimTrailingSlash(text) {
  return text.replace(/\/$/, "");
};

exports.trimTrailingSlash = trimTrailingSlash;

var throwErrorOnUnsupportedChainId = function throwErrorOnUnsupportedChainId(chainId) {
  if (!chainIdToNetworkName(chainId)) {
    throw new Error("The provided chainId ".concat(chainId, " is not supported by the oracles"));
  }

  return true;
};

exports.throwErrorOnUnsupportedChainId = throwErrorOnUnsupportedChainId;

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
              cache: 'no-cache'
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _isomorphicUnfetch["default"])(url, options);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            return _context.abrupt("return", _context.sent);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.log("Error fetching ".concat(url, ": "));
            console.error(_context.t0);
            return _context.abrupt("return", null);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function makeHttpRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeHttpRequest = makeHttpRequest;