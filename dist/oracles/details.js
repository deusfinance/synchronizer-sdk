"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDetails = void 0;

var _index = require("../utils/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var parseSectorName = function parseSectorName(sector) {
  switch (sector.toUpperCase()) {
    case 'STOCK' || 'XDAI-STOCK':
      return 'stock';

    case 'XDAI-CRYPTO':
      return 'crypto';

    default:
      return 'stock';
  }
};

var fetchDetails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerMapping) {
    var promises, responses;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (providerMapping) {
              _context.next = 3;
              break;
            }

            throw new Error('providerMapping is missing @fetchSignatures');

          case 3:
            promises = providerMapping.map(function (provider) {
              var url = "".concat(provider, "/registrar-detail.json");
              return (0, _index.makeHttpRequest)(url);
            });
            _context.next = 6;
            return Promise.allSettled(promises);

          case 6:
            responses = _context.sent;
            return _context.abrupt("return", responses.map(function (response) {
              var _response$value;

              if (response.status !== 'fulfilled') {
                throw new Error("response.status returns unfulfilled: ".concat(response));
              }

              var tokens = (_response$value = response === null || response === void 0 ? void 0 : response.value) !== null && _response$value !== void 0 ? _response$value : {};

              for (var symbol in tokens) {
                var value = tokens[symbol];
                tokens[symbol] = {
                  name: value.name,
                  sector: parseSectorName(value.sector),
                  symbol: value.symbol,
                  short_name: value.short_name,
                  short_symbol: value.short_symbol,
                  long_name: value.long_name,
                  long_symbol: value.long_symbol
                };
              }

              return tokens;
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log('Something went wrong while trying to fetch details:');
            console.error(_context.t0);
            return _context.abrupt("return", {});

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function fetchDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchDetails = fetchDetails;