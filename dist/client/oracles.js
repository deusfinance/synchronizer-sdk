"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSignatures = exports.getQuotes = exports.getDetails = exports.getConducted = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _signatures = require("../oracles/signatures.js");

var _conducted = require("../oracles/conducted.js");

var _quotes = require("../oracles/quotes.js");

var _details = require("../oracles/details.js");

var _index = require("../utils/index.js");

var getSignatures = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(providerMapping, primaryChainId, secondaryChainId) {
    var chainId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chainId = secondaryChainId ? secondaryChainId : primaryChainId;
            console.log("Fetching signatures for chainId: ".concat(chainId));
            (0, _index.throwErrorOnUnsupportedChainId)(chainId);
            return _context.abrupt("return", (0, _signatures.fetchSignatures)(providerMapping, chainId));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSignatures(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSignatures = getSignatures;

var getConducted = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(providerMapping, primaryChainId, secondaryChainId) {
    var chainId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chainId = secondaryChainId ? secondaryChainId : primaryChainId;
            console.log("Fetching conducted for chainId: ".concat(chainId));
            (0, _index.throwErrorOnUnsupportedChainId)(chainId);
            return _context2.abrupt("return", (0, _conducted.fetchConducted)(providerMapping, chainId));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getConducted(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConducted = getConducted;

var getQuotes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(providerMapping, primaryChainId, secondaryChainId) {
    var chainId;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chainId = secondaryChainId ? secondaryChainId : primaryChainId;
            console.log("Fetching quotes for chainId: ".concat(chainId));
            (0, _index.throwErrorOnUnsupportedChainId)(chainId);
            return _context3.abrupt("return", (0, _quotes.fetchQuotes)(providerMapping, chainId));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getQuotes(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getQuotes = getQuotes;

var getDetails = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(providerMapping) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('Fetching registrar details');
            return _context4.abrupt("return", (0, _details.fetchDetails)(providerMapping));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getDetails(_x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getDetails = getDetails;