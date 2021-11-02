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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DeusClient = /*#__PURE__*/function () {
  function DeusClient() {
    var _options$verbose;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$providerMapping = _ref.providerMapping,
        providerMapping = _ref$providerMapping === void 0 ? [] : _ref$providerMapping,
        _ref$chainId = _ref.chainId,
        chainId = _ref$chainId === void 0 ? 1 : _ref$chainId,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options;

    _classCallCheck(this, DeusClient);

    this.providerMapping = providerMapping.map(function (provider) {
      return (0, _index.trimTrailingSlash)(provider);
    });
    this.chainId = chainId;
    this.verbose = (_options$verbose = options === null || options === void 0 ? void 0 : options.verbose) !== null && _options$verbose !== void 0 ? _options$verbose : false;

    this._sanitizeParams();
  }

  _createClass(DeusClient, [{
    key: "_sanitizeParams",
    value: function _sanitizeParams() {
      if (!this.providerMapping.length) throw new Error('providerMapping is an empty array');
      (0, _index.isSupportedChainId)(this.chainId);
    }
  }, {
    key: "setChainId",
    value: function setChainId(chainId) {
      (0, _index.isSupportedChainId)(chainId);
      return this.chainId = chainId;
    }
  }, {
    key: "getSignatures",
    value: function () {
      var _getSignatures = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(secondaryChainId) {
        var chainId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                chainId = secondaryChainId !== null && secondaryChainId !== void 0 ? secondaryChainId : this.chainId;
                this.verbose && console.log("Fetching signatures for chainId: ".concat(chainId));
                (0, _index.isSupportedChainId)(chainId);
                return _context.abrupt("return", (0, _signatures.fetchSignatures)(this.providerMapping, chainId));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSignatures(_x) {
        return _getSignatures.apply(this, arguments);
      }

      return getSignatures;
    }()
  }, {
    key: "getConducted",
    value: function () {
      var _getConducted = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(secondaryChainId) {
        var chainId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                chainId = secondaryChainId !== null && secondaryChainId !== void 0 ? secondaryChainId : this.chainId;
                this.verbose && console.log("Fetching conducted for chainId: ".concat(chainId));
                (0, _index.isSupportedChainId)(chainId);
                return _context2.abrupt("return", (0, _conducted.fetchConducted)(this.providerMapping, secondaryChainId !== null && secondaryChainId !== void 0 ? secondaryChainId : this.chainId));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getConducted(_x2) {
        return _getConducted.apply(this, arguments);
      }

      return getConducted;
    }()
  }, {
    key: "getQuotes",
    value: function () {
      var _getQuotes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(secondaryChainId) {
        var chainId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                chainId = secondaryChainId !== null && secondaryChainId !== void 0 ? secondaryChainId : this.chainId;
                this.verbose && console.log("Fetching quotes for chainId: ".concat(chainId));
                (0, _index.isSupportedChainId)(chainId);
                return _context3.abrupt("return", (0, _quotes.fetchQuotes)(this.providerMapping, secondaryChainId !== null && secondaryChainId !== void 0 ? secondaryChainId : this.chainId));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getQuotes(_x3) {
        return _getQuotes.apply(this, arguments);
      }

      return getQuotes;
    }()
  }, {
    key: "getDetails",
    value: function () {
      var _getDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.verbose && console.log('Fetching registrar details');
                return _context4.abrupt("return", (0, _details.fetchDetails)(this.providerMapping));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getDetails() {
        return _getDetails.apply(this, arguments);
      }

      return getDetails;
    }()
  }, {
    key: "constants",
    get: function get() {
      return {
        SUPPORTED_CHAINS_BY_NAME: _index2.SUPPORTED_CHAINS_BY_NAME,
        SUPPORTED_CHAINS_BY_CHAIN_ID: _index2.SUPPORTED_CHAINS_BY_CHAIN_ID,
        SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID: _index2.SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID,
        ABI: _index2.ABI
      };
    }
  }, {
    key: "getMethods",
    value: function getMethods() {
      return [this.setChainId, this.getSignatures, this.getConducted, this.getQuotes, this.getDetails, this.constants];
    }
  }]);

  return DeusClient;
}();

exports.DeusClient = DeusClient;