"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchConducted = void 0;

var _index = require("../utils/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchConducted = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerMapping, chainId) {
    var networkName, promises, responses, modifiedResponses, conductedWithConsensus, symbol, o, hasCorrectCount;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (providerMapping) {
              _context.next = 3;
              break;
            }

            throw new Error('providerMapping is missing @fetchConducted');

          case 3:
            if (chainId) {
              _context.next = 5;
              break;
            }

            throw new Error('chainId is missing @fetchConducted');

          case 5:
            networkName = (0, _index.chainIdToNetworkName)(chainId);

            if (networkName) {
              _context.next = 8;
              break;
            }

            throw new Error('networkName is null @fetchConducted');

          case 8:
            promises = providerMapping.map(function (provider) {
              var url = "".concat(provider, "/").concat(networkName, "/conducted.json");
              return (0, _index.makeHttpRequest)(url);
            });
            _context.next = 11;
            return Promise.allSettled(promises);

          case 11:
            responses = _context.sent;
            // Modify output to default format to ensure easier cross-matching
            modifiedResponses = responses.map(function (response) {
              var _response$value$token, _response$value;

              if (response.status !== 'fulfilled') {
                throw new Error("response.status returns unfulfilled: ".concat(response));
              }

              var tokens = (_response$value$token = response === null || response === void 0 ? void 0 : (_response$value = response.value) === null || _response$value === void 0 ? void 0 : _response$value.tokens) !== null && _response$value$token !== void 0 ? _response$value$token : [];
              return tokens.reduce(function (acc, o) {
                acc[o.id] = {
                  "long": o["long"],
                  "short": o["short"]
                };
                return acc;
              }, {});
            }); // Check if there's consensus among nodes, e.g. symbols must be omnipresent + contain identical data

            conductedWithConsensus = modifiedResponses.reduce(function (acc, providerResponse, index) {
              for (var symbol in providerResponse) {
                var longValue = providerResponse[symbol]['long'];
                var shortValue = providerResponse[symbol]['short'];

                if (!acc[symbol]) {
                  acc[symbol] = {
                    "long": longValue,
                    "short": shortValue,
                    long_consensus: true,
                    short_consensus: true,
                    count_consensus: true,
                    count: 0
                  };
                } // Check if this oracle's contracts matches the ones provided by the other oracles


                var hasMatchingLong = acc[symbol]['long'] === longValue;
                var hasMatchingShort = acc[symbol]['short'] === shortValue; // All the nodes must provide a response for this symbol, else its an anomaly as well

                acc[symbol]['count']++; // Override truthy values if we've found anomalies, else don't override and leave it false.

                if (acc[symbol]['long_consensus']) {
                  acc[symbol]['long_consensus'] = hasMatchingLong;
                }

                if (acc[symbol]['short_consensus']) {
                  acc[symbol]['short_consensus'] = hasMatchingShort;
                }
              }

              return acc;
            }, {}); // Lastly, check if all symbols are entirely covered

            for (symbol in conductedWithConsensus) {
              o = conductedWithConsensus[symbol];
              hasCorrectCount = o['count'] === responses.length;
              o['count_consensus'] = hasCorrectCount !== null && hasCorrectCount !== void 0 ? hasCorrectCount : false;
            }

            return _context.abrupt("return", conductedWithConsensus);

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            console.log('Something went wrong while trying to fetch conducted:');
            console.error(_context.t0);
            return _context.abrupt("return", {});

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function fetchConducted(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchConducted = fetchConducted;