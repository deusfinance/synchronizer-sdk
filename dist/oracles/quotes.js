"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchQuotes = void 0;

var _index = require("../utils/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchQuotes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerMapping, chainId) {
    var networkName, promises, responses, beautifiedQuotes, symbol, o, hasCorrectCount;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (providerMapping) {
              _context.next = 3;
              break;
            }

            throw new Error('providerMapping is missing @fetchQuotes');

          case 3:
            if (chainId) {
              _context.next = 5;
              break;
            }

            throw new Error('chainId is missing @fetchQuotes');

          case 5:
            networkName = (0, _index.chainIdToNetworkName)(chainId);

            if (networkName) {
              _context.next = 8;
              break;
            }

            throw new Error('networkName is null @fetchQuotes');

          case 8:
            promises = providerMapping.map(function (provider) {
              var url = "".concat(provider, "/").concat(networkName, "/price.json");
              return (0, _index.makeHttpRequest)(url);
            });
            _context.next = 11;
            return Promise.allSettled(promises);

          case 11:
            responses = _context.sent;
            responses = responses.map(function (response) {
              var _response$value;

              if (response.status === 'fulfilled') return (_response$value = response === null || response === void 0 ? void 0 : response.value) !== null && _response$value !== void 0 ? _response$value : {};
              throw new Error("response.status returns unfulfilled: ".concat(response));
            }); // Beautify + check if all nodes provide the same symbols by logging `count`, however we DON'T check for data anomalies,
            // due to the nature of the oracle system in which pricing may vary across nodes for a variety of reasons.

            beautifiedQuotes = responses.reduce(function (acc, providerResponse, index) {
              for (var symbol in providerResponse) {
                var objLong = providerResponse[symbol]['Long'];
                var objShort = providerResponse[symbol]['Short'];

                if (!acc[symbol]) {
                  var _objLong$price, _objLong$fee, _objLong$is_close, _objShort$price, _objShort$fee, _objShort$is_close;

                  acc[symbol] = {
                    "long": {
                      price: (_objLong$price = objLong === null || objLong === void 0 ? void 0 : objLong.price) !== null && _objLong$price !== void 0 ? _objLong$price : 0,
                      fee: (_objLong$fee = objLong === null || objLong === void 0 ? void 0 : objLong.fee) !== null && _objLong$fee !== void 0 ? _objLong$fee : 0,
                      closed: (_objLong$is_close = objLong === null || objLong === void 0 ? void 0 : objLong.is_close) !== null && _objLong$is_close !== void 0 ? _objLong$is_close : false
                    },
                    "short": {
                      price: (_objShort$price = objShort === null || objShort === void 0 ? void 0 : objShort.price) !== null && _objShort$price !== void 0 ? _objShort$price : 0,
                      fee: (_objShort$fee = objShort === null || objShort === void 0 ? void 0 : objShort.fee) !== null && _objShort$fee !== void 0 ? _objShort$fee : 0,
                      closed: (_objShort$is_close = objShort === null || objShort === void 0 ? void 0 : objShort.is_close) !== null && _objShort$is_close !== void 0 ? _objShort$is_close : false
                    },
                    count_consensus: true,
                    count: 0
                  };
                }

                acc[symbol]['count']++;
              }

              return acc;
            }, {}); // Now check the logged count

            for (symbol in beautifiedQuotes) {
              o = beautifiedQuotes[symbol];
              hasCorrectCount = o['count'] === responses.length;
              o['count_consensus'] = hasCorrectCount !== null && hasCorrectCount !== void 0 ? hasCorrectCount : false;
            }

            return _context.abrupt("return", beautifiedQuotes);

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            console.log('Something went wrong while trying to fetch the quotes:');
            console.error(_context.t0);
            return _context.abrupt("return", {});

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function fetchQuotes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchQuotes = fetchQuotes;