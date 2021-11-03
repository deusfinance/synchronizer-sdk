"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeusClient = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = require("./utils/index.js");

var _utils = require("./client/utils.js");

var _oracles = require("./client/oracles.js");

var constants = _interopRequireWildcard(require("./client/constants.js"));

var _functions = require("./client/functions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DeusClient = /*#__PURE__*/function () {
  function DeusClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$providers = _ref.providers,
        providers = _ref$providers === void 0 ? [] : _ref$providers,
        chainId = _ref.chainId,
        minimumSignatures = _ref.minimumSignatures;

    (0, _classCallCheck2["default"])(this, DeusClient);
    this.providerMapping = providers.map(function (provider) {
      return (0, _index.trimTrailingSlash)(provider);
    });
    this.chainId = chainId;
    this.minimumSignatures = minimumSignatures; // Sanitize params

    if (!this.providerMapping.length) throw new Error('providers is an empty array');
    (0, _index.throwErrorOnUnsupportedChainId)(this.chainId);
    if (!this.minimumSignatures && this.minimumSignatures !== 0) throw new Error('minimumSignatures is not defined');
    if (this.minimumSignatures == 0) throw new Error('minimumSignatures can not be zero');
    if (this.minimumSignatures > this.providerMapping.length) throw new Error('minimumSignatures is greater than the number of providers');
  }

  (0, _createClass2["default"])(DeusClient, [{
    key: "setChainId",
    value: function setChainId(chainId) {
      (0, _index.throwErrorOnUnsupportedChainId)(chainId);
      return this.chainId = chainId;
    }
  }, {
    key: "oracles",
    get: function get() {
      var _this = this;

      return {
        getSignatures: function () {
          var _getSignatures2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(secondaryChainId) {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", (0, _oracles.getSignatures)(_this.providerMapping, _this.chainId, secondaryChainId));

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function getSignatures(_x) {
            return _getSignatures2.apply(this, arguments);
          }

          return getSignatures;
        }(),
        getConducted: function () {
          var _getConducted2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(secondaryChainId) {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", (0, _oracles.getConducted)(_this.providerMapping, _this.chainId, secondaryChainId));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function getConducted(_x2) {
            return _getConducted2.apply(this, arguments);
          }

          return getConducted;
        }(),
        getQuotes: function () {
          var _getQuotes2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(secondaryChainId) {
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", (0, _oracles.getQuotes)(_this.providerMapping, _this.chainId, secondaryChainId));

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function getQuotes(_x3) {
            return _getQuotes2.apply(this, arguments);
          }

          return getQuotes;
        }(),
        getDetails: function () {
          var _getDetails2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
            return _regenerator["default"].wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", (0, _oracles.getDetails)(_this.providerMapping));

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function getDetails() {
            return _getDetails2.apply(this, arguments);
          }

          return getDetails;
        }()
      };
    }
  }, {
    key: "constants",
    get: function get() {
      return constants;
    }
  }, {
    key: "functions",
    get: function get() {
      var _this2 = this;

      return {
        prepareSignatureParams: function prepareSignatureParams(signatures, contract, action) {
          return (0, _functions.prepareSignatureParams)(signatures, contract, action, _this2.minimumSignatures);
        }
      };
    }
  }, {
    key: "utils",
    get: function get() {
      return {
        isSupportedChainId: _utils.isSupportedChainId
      };
    }
  }, {
    key: "getMethods",
    value: function getMethods() {
      return {
        getMethods: this.getMethods,
        setChainId: this.setChainId,
        oracles: this.oracles,
        constants: Object.keys(this.constants),
        functions: this.functions,
        utils: this.utils
      };
    }
  }]);
  return DeusClient;
}();

exports.DeusClient = DeusClient;