"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSignatures = void 0;

var _index = require("../utils/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchSignatures = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerMapping, chainId) {
    var networkName, promises, responses;
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
            if (chainId) {
              _context.next = 5;
              break;
            }

            throw new Error('chainId is missing @fetchSignatures');

          case 5:
            networkName = (0, _index.chainIdToNetworkName)(chainId);

            if (networkName) {
              _context.next = 8;
              break;
            }

            throw new Error('networkName is null @fetchSignatures');

          case 8:
            promises = providerMapping.map(function (provider) {
              var url = "".concat(provider, "/").concat(networkName, "/signatures.json");
              return (0, _index.makeHttpRequest)(url);
            });
            _context.next = 11;
            return Promise.allSettled(promises);

          case 11:
            responses = _context.sent;
            return _context.abrupt("return", responses.map(function (response) {
              var _response$value;

              if (response.status === 'fulfilled') return (_response$value = response === null || response === void 0 ? void 0 : response.value) !== null && _response$value !== void 0 ? _response$value : {};
              throw new Error("response.status returns unfulfilled: ".concat(response));
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log('Something went wrong while trying to fetch the signatures:');
            console.error(_context.t0);
            return _context.abrupt("return", {});

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function fetchSignatures(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchSignatures = fetchSignatures;