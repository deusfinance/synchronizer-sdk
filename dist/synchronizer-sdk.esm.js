import { Percent, JSBI, Token } from '@sushiswap/core-sdk';
export { Percent, Token } from '@sushiswap/core-sdk';
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { find } from 'lodash-es';
import { getAddress } from '@ethersproject/address';
import { createSlice, createAsyncThunk, configureStore, createAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { useDispatch, useSelector, Provider as Provider$1 } from 'react-redux';
import BigNumber from 'bignumber.js';
import { BigNumber as BigNumber$1 } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';

var SupportedChainId;

(function (SupportedChainId) {
  SupportedChainId[SupportedChainId["FANTOM"] = 250] = "FANTOM";
})(SupportedChainId || (SupportedChainId = {}));

var SynchronizerChains = [SupportedChainId.FANTOM];

var _Multicall, _Collateral, _Synchronizer, _PartnerManager, _Conductor, _RoleChecker;
var Multicall2 = (_Multicall = {}, _Multicall[SupportedChainId.FANTOM] = '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5', _Multicall);
var Collateral = (_Collateral = {}, _Collateral[SupportedChainId.FANTOM] = '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3', _Collateral);
var Synchronizer = (_Synchronizer = {}, _Synchronizer[SupportedChainId.FANTOM] = '0x71EB0bCFeB9610a79af007531aEeeE7848e76E71', _Synchronizer);
var PartnerManager = (_PartnerManager = {}, _PartnerManager[SupportedChainId.FANTOM] = '0x6796a6b39f2c8FF2bEfa223aC6eeD13a4d693ba4', _PartnerManager);
var Conductor = (_Conductor = {}, _Conductor[SupportedChainId.FANTOM] = '0x570d710d9f20599551246ec24d8a8ccffeb57ccf', _Conductor);
var RoleChecker = (_RoleChecker = {}, _RoleChecker[SupportedChainId.FANTOM] = '0x8e6f8844b73dae005b02fd8776ee4719e7d5eb01', _RoleChecker);

var _ORACLE_NETWORK_NAMES, _MUON_NETWORK_NAMES;

var INFO_BASE_URL = /*#__PURE__*/new URL('https://oracle1.deus.finance');
var ORACLE_NETWORK_NAMES = (_ORACLE_NETWORK_NAMES = {}, _ORACLE_NETWORK_NAMES[SupportedChainId.FANTOM] = 'fantom', _ORACLE_NETWORK_NAMES); // export const MuonClient = new Muon('https://node-balancer.muon.net/v1/')

var MuonClient = true; // https://github.com/muon-protocol/muon-node-js/blob/7fb51305f7a4315bf3a4e3d2e258ba37bb4111e3/utils/node-utils/eth.js

var MUON_NETWORK_NAMES = (_MUON_NETWORK_NAMES = {}, _MUON_NETWORK_NAMES[SupportedChainId.FANTOM] = 'fantom', _MUON_NETWORK_NAMES);

var PERCENT_DENOMINATOR = 100;
var PERCENT_SCALE = 10000;
function constructPercentage(value) {
  var percent = ~~(value * PERCENT_SCALE); // bitwise remove decimals

  return new Percent(JSBI.BigInt(percent), PERCENT_DENOMINATOR * PERCENT_SCALE).multiply(PERCENT_DENOMINATOR);
}

var Direction;

(function (Direction) {
  Direction["LONG"] = "LONG";
  Direction["SHORT"] = "SHORT";
})(Direction || (Direction = {}));

var Sector;

(function (Sector) {
  Sector["STOCKS"] = "STOCKS";
  Sector["CRYPTO"] = "CRYPTO";
  Sector["FOREX"] = "FOREX";
  Sector["COMMODITIES"] = "COMMODITIES";
  Sector["MISC"] = "MISC";
})(Sector || (Sector = {}));

var initialState = {
  forceRefresh: 0
};
var applicationSlice = /*#__PURE__*/createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    updateForceRefresh: function updateForceRefresh(state, _ref) {
      var payload = _ref.payload;
      state.forceRefresh = payload;
    }
  }
});
var reducer = applicationSlice.reducer;
function useApplicationState() {
  return useAppSelector(function (state) {
    return state.application;
  });
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var makeHttpRequest = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, options) {
    var response;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options === void 0) {
              options = {
                cache: 'no-cache'
              };
            }

            _context.prev = 1;
            _context.next = 4;
            return fetch(url, options);

          case 4:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return response.json();

          case 8:
            return _context.abrupt("return", _context.sent);

          case 11:
            throw new Error(response.statusText);

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            console.error("Error fetching " + url + ": ", _context.t0);
            return _context.abrupt("return", null);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));

  return function makeHttpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var ConductedStatus;

(function (ConductedStatus) {
  ConductedStatus["OK"] = "OK";
  ConductedStatus["LOADING"] = "LOADING";
  ConductedStatus["ERROR"] = "ERROR";
})(ConductedStatus || (ConductedStatus = {}));

var initialState$1 = {
  status: ConductedStatus.LOADING,
  conducted: {}
};
var fetchConducted = /*#__PURE__*/createAsyncThunk('conducted/fetchConducted', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
  var results;
  return runtime_1.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Promise.allSettled(Object.entries(ORACLE_NETWORK_NAMES).map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref2) {
              var chainId, networkName, _URL, url, response;

              return runtime_1.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      chainId = _ref2[0], networkName = _ref2[1];
                      _URL = new URL("/" + networkName + "/conducted.json", INFO_BASE_URL), url = _URL.href;
                      _context.next = 4;
                      return makeHttpRequest(url);

                    case 4:
                      response = _context.sent;
                      return _context.abrupt("return", {
                        chainId: Number(chainId),
                        result: response.tokens
                      });

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref3.apply(this, arguments);
            };
          }()));

        case 2:
          results = _context2.sent;
          return _context2.abrupt("return", results.reduce(function (acc, res) {
            if (res.status !== 'fulfilled') return acc;
            acc[res.value.chainId] = res.value.result;
            return acc;
          }, {}));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
var conductedSlice = /*#__PURE__*/createSlice({
  name: 'conducted',
  initialState: initialState$1,
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchConducted.pending, function (state) {
      state.status = ConductedStatus.LOADING;
    }).addCase(fetchConducted.fulfilled, function (state, _ref4) {
      var payload = _ref4.payload;
      state.status = ConductedStatus.OK;
      state.conducted = payload;
    }).addCase(fetchConducted.rejected, function () {
      console.log('Unable to fetch conducted');
      return _extends({}, initialState$1, {
        status: ConductedStatus.ERROR
      });
    });
  }
});
var reducer$1 = conductedSlice.reducer;
function useConductedState() {
  return useAppSelector(function (state) {
    return state.conducted;
  });
}

var DetailsStatus;

(function (DetailsStatus) {
  DetailsStatus["OK"] = "OK";
  DetailsStatus["LOADING"] = "LOADING";
  DetailsStatus["ERROR"] = "ERROR";
})(DetailsStatus || (DetailsStatus = {}));

var initialState$2 = {
  status: DetailsStatus.LOADING,
  details: {}
};
var fetchDetails = /*#__PURE__*/createAsyncThunk('details/fetchDetails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
  var _URL, url, response;

  return runtime_1.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _URL = new URL("/registrar-detail.json", INFO_BASE_URL), url = _URL.href;
          _context.next = 3;
          return makeHttpRequest(url);

        case 3:
          response = _context.sent;
          return _context.abrupt("return", Object.entries(response).reduce(function (acc, _ref2) {
            var symbol = _ref2[0],
                data = _ref2[1];
            acc[symbol] = {
              name: data.name,
              sector: data.sector === 'stock' ? Sector.STOCKS : data.sector === 'crypto' ? Sector.CRYPTO : Sector.FOREX,
              symbol: data.symbol,
              shortSymbol: data.short_symbol,
              longSymbol: data.long_symbol
            };
            return acc;
          }, {}));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
var detailsSlice = /*#__PURE__*/createSlice({
  name: 'details',
  initialState: initialState$2,
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchDetails.pending, function (state) {
      state.status = DetailsStatus.LOADING;
    }).addCase(fetchDetails.fulfilled, function (state, _ref3) {
      var payload = _ref3.payload;
      state.status = DetailsStatus.OK;
      state.details = payload;
    }).addCase(fetchDetails.rejected, function () {
      console.log('Unable to fetch details');
      return _extends({}, initialState$2, {
        status: DetailsStatus.ERROR
      });
    });
  }
});
var reducer$2 = detailsSlice.reducer;
function useDetailsState() {
  return useAppSelector(function (state) {
    return state.details;
  });
}

var _partnerFee, _platformFee;
var FeesStatus;

(function (FeesStatus) {
  FeesStatus["OK"] = "OK";
  FeesStatus["LOADING"] = "LOADING";
  FeesStatus["ERROR"] = "ERROR";
})(FeesStatus || (FeesStatus = {}));

var initialState$3 = {
  status: FeesStatus.LOADING,
  partnerFee: (_partnerFee = {}, _partnerFee[Sector.STOCKS] = '0', _partnerFee[Sector.CRYPTO] = '0', _partnerFee[Sector.FOREX] = '0', _partnerFee[Sector.COMMODITIES] = '0', _partnerFee[Sector.MISC] = '0', _partnerFee),
  platformFee: (_platformFee = {}, _platformFee[Sector.STOCKS] = '0', _platformFee[Sector.CRYPTO] = '0', _platformFee[Sector.FOREX] = '0', _platformFee[Sector.COMMODITIES] = '0', _platformFee[Sector.MISC] = '0', _platformFee)
};
var feesSlice = /*#__PURE__*/createSlice({
  name: 'fees',
  initialState: initialState$3,
  reducers: {
    updatePlatformFee: function updatePlatformFee(state, _ref) {
      var payload = _ref.payload;
      state.platformFee = _extends({}, state.platformFee, payload);
    },
    updatePartnerFee: function updatePartnerFee(state, _ref2) {
      var payload = _ref2.payload;
      state.partnerFee = _extends({}, state.partnerFee, payload);
    }
  }
});
var actions = feesSlice.actions,
    reducer$3 = feesSlice.reducer;
var updatePlatformFee = actions.updatePlatformFee,
    updatePartnerFee = actions.updatePartnerFee;

var QuotesStatus;

(function (QuotesStatus) {
  QuotesStatus["OK"] = "OK";
  QuotesStatus["LOADING"] = "LOADING";
  QuotesStatus["ERROR"] = "ERROR";
})(QuotesStatus || (QuotesStatus = {}));

var initialState$4 = {
  status: QuotesStatus.LOADING,
  quotes: {}
};
var fetchQuotes = /*#__PURE__*/createAsyncThunk('quotes/fetchQuotes', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
  var results;
  return runtime_1.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Promise.allSettled(Object.entries(ORACLE_NETWORK_NAMES).map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref2) {
              var chainId, networkName, _URL, url, response, result;

              return runtime_1.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      chainId = _ref2[0], networkName = _ref2[1];
                      _URL = new URL("/" + networkName + "/price.json", INFO_BASE_URL), url = _URL.href;
                      _context.next = 4;
                      return makeHttpRequest(url);

                    case 4:
                      response = _context.sent;
                      // Modify response
                      result = Object.entries(response).reduce(function (acc, _ref4) {
                        var _values$Long$price, _values$Long, _values$Short$price, _values$Short;

                        var symbol = _ref4[0],
                            values = _ref4[1];
                        var longPrice = (_values$Long$price = (_values$Long = values.Long) == null ? void 0 : _values$Long.price) != null ? _values$Long$price : 0;
                        var shortPrice = (_values$Short$price = (_values$Short = values.Short) == null ? void 0 : _values$Short.price) != null ? _values$Short$price : 0;
                        acc[symbol] = {
                          "long": {
                            price: longPrice.toFixed(6),
                            open: !!longPrice
                          },
                          "short": {
                            price: shortPrice.toFixed(6),
                            open: !!shortPrice
                          }
                        };
                        return acc;
                      }, {});
                      return _context.abrupt("return", {
                        chainId: Number(chainId),
                        result: result
                      });

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref3.apply(this, arguments);
            };
          }()));

        case 2:
          results = _context2.sent;
          return _context2.abrupt("return", results.reduce(function (acc, res) {
            if (res.status !== 'fulfilled') return acc;
            acc[res.value.chainId] = res.value.result;
            return acc;
          }, {}));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
var quotesSlice = /*#__PURE__*/createSlice({
  name: 'quotes',
  initialState: initialState$4,
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchQuotes.pending, function (state) {
      state.status = QuotesStatus.LOADING;
    }).addCase(fetchQuotes.fulfilled, function (state, _ref5) {
      var payload = _ref5.payload;
      state.status = QuotesStatus.OK;
      state.quotes = payload;
    }).addCase(fetchQuotes.rejected, function () {
      console.log('Unable to fetch quotes');
      return _extends({}, initialState$4, {
        status: QuotesStatus.ERROR
      });
    });
  }
});
var reducer$4 = quotesSlice.reducer;

var SignaturesStatus;

(function (SignaturesStatus) {
  SignaturesStatus["OK"] = "OK";
  SignaturesStatus["LOADING"] = "LOADING";
  SignaturesStatus["ERROR"] = "ERROR";
})(SignaturesStatus || (SignaturesStatus = {}));

var initialState$5 = {
  status: SignaturesStatus.LOADING,
  signatures: {}
};
var fetchSignatures = /*#__PURE__*/createAsyncThunk('signatures/fetchSignatures', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
  var results;
  return runtime_1.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Promise.allSettled(Object.entries(ORACLE_NETWORK_NAMES).map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref2) {
              var chainId, networkName, _URL, url, response;

              return runtime_1.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      chainId = _ref2[0], networkName = _ref2[1];
                      _URL = new URL("/" + networkName + "/signatures.json", INFO_BASE_URL), url = _URL.href;
                      _context.next = 4;
                      return makeHttpRequest(url);

                    case 4:
                      response = _context.sent;
                      return _context.abrupt("return", {
                        chainId: Number(chainId),
                        result: response
                      });

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref3.apply(this, arguments);
            };
          }()));

        case 2:
          results = _context2.sent;
          return _context2.abrupt("return", results.reduce(function (acc, res) {
            if (res.status !== 'fulfilled') return acc;
            acc[res.value.chainId] = res.value.result;
            return acc;
          }, {}));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
var signaturesSlice = /*#__PURE__*/createSlice({
  name: 'signatures',
  initialState: initialState$5,
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchSignatures.pending, function (state) {
      state.status = SignaturesStatus.LOADING;
    }).addCase(fetchSignatures.fulfilled, function (state, _ref4) {
      var payload = _ref4.payload;
      state.status = SignaturesStatus.OK;
      state.signatures = payload;
    }).addCase(fetchSignatures.rejected, function () {
      console.log('Unable to fetch signatures');
      return _extends({}, initialState$5, {
        status: SignaturesStatus.ERROR
      });
    });
  }
});
var reducer$5 = signaturesSlice.reducer;
function useSignaturesState() {
  return useAppSelector(function (state) {
    return state.signatures;
  });
}

var store = /*#__PURE__*/configureStore({
  reducer: {
    application: reducer,
    conducted: reducer$1,
    details: reducer$2,
    fees: reducer$3,
    quotes: reducer$4,
    signatures: reducer$5
  },
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: true
    });
  }
});
setupListeners(store.dispatch);
var useAppDispatch = function useAppDispatch() {
  return useDispatch();
};
var useAppSelector = useSelector;

function useQuotesState() {
  return useAppSelector(function (state) {
    return state.quotes;
  });
}

function useFeesState() {
  return useAppSelector(function (state) {
    return state.fees;
  });
}
function useTotalFeeCallback() {
  var _useFeesState = useFeesState(),
      platformFee = _useFeesState.platformFee,
      partnerFee = _useFeesState.partnerFee;

  return useCallback(function (sector) {
    return new BigNumber(platformFee[sector]).plus(partnerFee[sector]).div(1e18);
  }, [platformFee, partnerFee]);
}
function usePlatformFeeCallback() {
  var _useFeesState2 = useFeesState(),
      platformFee = _useFeesState2.platformFee;

  return useCallback(function (sector) {
    return new BigNumber(platformFee[sector]).div(1e18);
  }, [platformFee]);
}
function usePartnerFeeCallback() {
  var _useFeesState3 = useFeesState(),
      partnerFee = _useFeesState3.partnerFee;

  return useCallback(function (sector) {
    return new BigNumber(partnerFee[sector]).div(1e18);
  }, [partnerFee]);
}

function sortAlphabetically(x, y) {
  if (x.ticker < y.ticker) {
    return -1;
  }

  if (x.ticker > y.ticker) {
    return 1;
  }

  return 0;
}
/**
 * A list of all conducted assets supported by DEUS, where longs/shorts are considered siblings.
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of paired Registrars
 */


function useRegistrarPairs(chainId) {
  var _useConductedState = useConductedState(),
      conducted = _useConductedState.conducted;

  var _useQuotesState = useQuotesState(),
      quotes = _useQuotesState.quotes;

  var _useSignaturesState = useSignaturesState(),
      signatures = _useSignaturesState.signatures;

  var _useDetailsState = useDetailsState(),
      details = _useDetailsState.details;

  var getFee = useTotalFeeCallback();

  var _useMemo = useMemo(function () {
    return [getFee(Sector.STOCKS).toNumber(), getFee(Sector.CRYPTO).toNumber(), getFee(Sector.FOREX).toNumber()];
  }, [getFee]),
      stockFee = _useMemo[0],
      cryptoFee = _useMemo[1],
      forexFee = _useMemo[2];

  return useMemo(function () {
    if (!chainId || !conducted[chainId] || !quotes[chainId] || !signatures[chainId] || !details) return [];
    return conducted[chainId].map(function (_ref) {
      var id = _ref.id,
          _long = _ref["long"],
          _short = _ref["short"];
      var quote = quotes[chainId][id];
      var longSigs = signatures[chainId][_long];
      var shortSigs = signatures[chainId][_short];
      var asset = details[id];

      if (!asset || !quote || !quote["long"] || !quote["short"]) {
        return null;
      }

      var fee = asset.sector === Sector.STOCKS ? stockFee : asset.sector === Sector.CRYPTO ? cryptoFee : forexFee;
      var longRegistrar = {
        id: id,
        chainId: chainId,
        ticker: asset.symbol,
        name: asset.name,
        sector: asset.sector,
        direction: Direction.LONG,
        contract: getAddress(_long),
        sibling: _short,
        symbol: asset.longSymbol,
        price: quote["long"].price,
        fee: constructPercentage(fee),
        open: !!longSigs,
        token: new Token(chainId, getAddress(_long), 18, asset.symbol, asset.name)
      };
      var shortRegistrar = {
        id: id,
        chainId: chainId,
        ticker: asset.symbol,
        name: asset.name,
        sector: asset.sector,
        direction: Direction.SHORT,
        contract: getAddress(_short),
        sibling: _long,
        symbol: asset.shortSymbol,
        price: quote["short"].price,
        fee: constructPercentage(fee),
        open: !!shortSigs,
        token: new Token(chainId, getAddress(_short), 18, asset.symbol, asset.name)
      };
      return {
        id: id,
        "long": longRegistrar,
        "short": shortRegistrar
      };
    }).filter(function (o) {
      return o;
    });
  }, [chainId, details, conducted, quotes, signatures, stockFee, cryptoFee, forexFee]);
}
/**
 * A list of all conducted assets supported by DEUS, where longs/shorts are returned individually.
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of single Registrars
 */

function useRegistrars(chainId) {
  var registrars = useRegistrarPairs(chainId);
  return useMemo(function () {
    return registrars.reduce(function (acc, pair) {
      acc.push.apply(acc, [pair["long"], pair["short"]]);
      return acc;
    }, []).sort(sortAlphabetically);
  }, [registrars]);
}
/**
 * Find a Registrar by its contract, ignores checksums
 * @param contract the registrarContract
 * @param chainId chainId supported by the Synchronizer
 * @returns found Registrar or undefined
 */

function useRegistrarByContract(contract, chainId) {
  var registrars = useRegistrars(chainId);
  return useMemo(function () {
    if (!contract) return undefined;
    var registrar = find(registrars, function (obj) {
      return obj.contract.toUpperCase() === contract.toUpperCase();
    });
    return registrar != null ? registrar : undefined;
  }, [contract, registrars]);
}
/**
 * Return Registrars as instances of Sushiswap's Token standard
 * @param chainId chainId supported by the Synchronizer
 * @returns mapping of Tokens by their respective contracts
 */

function useRegistrarTokenMap(chainId) {
  var registrars = useRegistrars(chainId);
  return useMemo(function () {
    return registrars.reduce(function (acc, registrar) {
      acc[registrar.contract] = registrar.token;
      return acc;
    }, {});
  }, [registrars]);
}
/**
 * Return Registrars as instances of Sushiswap's Token standard
 * @param chainId chainId supported by the Synchronizer
 * @returns list of Tokens
 */

function useRegistrarTokens(chainId) {
  var registrars = useRegistrars(chainId);
  return useMemo(function () {
    return registrars.map(function (registrar) {
      return registrar.token;
    });
  }, [registrars]);
}

var updateForceRefresh = /*#__PURE__*/createAction('application/updateForceRefresh');

function useForceRefreshCallback() {
  var _useApplicationState = useApplicationState(),
      forceRefresh = _useApplicationState.forceRefresh;

  var dispatch = useAppDispatch();
  return useCallback(function () {
    dispatch(updateForceRefresh(forceRefresh + 1));
  }, [dispatch, forceRefresh, updateForceRefresh]);
}

function Updater() {
  var thunkDispatch = useAppDispatch();
  useEffect(function () {
    thunkDispatch(fetchConducted());
  }, [thunkDispatch]);
  return null;
}

function Updater$1() {
  var thunkDispatch = useAppDispatch();
  useEffect(function () {
    thunkDispatch(fetchDetails());
  }, [thunkDispatch]);
  return null;
}

var PartnerManagerABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "platform_",
				type: "address"
			},
			{
				internalType: "uint256[3]",
				name: "platformFee_",
				type: "uint256[3]"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256[3]",
				name: "partnerFee",
				type: "uint256[3]"
			}
		],
		name: "PartnerAdded",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "stockFee",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "cryptoFee",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "forexFee",
				type: "uint256"
			}
		],
		name: "addPartner",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "isPartner",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "partnerFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "platform",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "platformFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "scale",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var _Providers;
var Providers = (_Providers = {}, _Providers[SupportedChainId.FANTOM] = /*#__PURE__*/new JsonRpcProvider('https://rpc.ftm.tools'), _Providers);

function usePartnerManager(chainId) {
  var address = useMemo(function () {
    return chainId && chainId in PartnerManager ? PartnerManager[chainId] : PartnerManager[250];
  }, [chainId]);
  return useContract(chainId, address, PartnerManagerABI);
}

function useContract(chainId, address, ABI) {
  var provider = useProvider(chainId);
  return useMemo(function () {
    return new Contract(address, ABI, provider);
  }, [address, ABI, provider]);
}

function useProvider(chainId) {
  return useMemo(function () {
    return chainId && chainId in Providers ? Providers[chainId] : Providers[250];
  }, [chainId]);
}

var ZERO = /*#__PURE__*/BigNumber$1.from('0');
var ZERO_MAP = [ZERO, ZERO, ZERO];
function Updater$2(_ref) {
  var chainId = _ref.chainId,
      partnerId = _ref.partnerId;
  var dispatch = useAppDispatch();
  var PartnerManager = usePartnerManager(chainId);

  var _useState = useState(ZERO_MAP),
      partnerFees = _useState[0],
      setPartnerFees = _useState[1];

  var _useState2 = useState(ZERO_MAP),
      platformFees = _useState2[0],
      setPlatformFees = _useState2[1];

  var isSupported = useMemo(function () {
    return chainId ? Object.values(SynchronizerChains).includes(chainId) : false;
  }, [chainId]);
  var partnerArgs = useMemo(function () {
    return !isSupported ? [] : [[partnerId, 0], [partnerId, 1], [partnerId, 2]];
  }, [isSupported, partnerId]);
  var platformArgs = useMemo(function () {
    return !isSupported ? [] : [0, 1, 2];
  }, [isSupported]);
  useEffect(function () {
    var fetchPartnerFees = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var result;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Promise.all(partnerArgs.map(function (args) {
                  return PartnerManager.partnerFee.apply(PartnerManager, args);
                }));

              case 3:
                result = _context.sent;

                if (result.length) {
                  setPartnerFees(result);
                }

                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error('Unable to fetch PartnerFees: ', _context.t0);
                setPartnerFees(ZERO_MAP);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function fetchPartnerFees() {
        return _ref2.apply(this, arguments);
      };
    }();

    if (PartnerManager && partnerArgs.length) {
      fetchPartnerFees();
    }
  }, [partnerArgs, PartnerManager]);
  useEffect(function () {
    var fetchPlatformFees = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
        var result;
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Promise.all(platformArgs.map(function (val) {
                  return PartnerManager.platformFee(val);
                }));

              case 3:
                result = _context2.sent;

                if (result.length) {
                  setPlatformFees(result);
                }

                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.error('Unable to fetch PlatformFees: ', _context2.t0);
                setPartnerFees(ZERO_MAP);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      return function fetchPlatformFees() {
        return _ref3.apply(this, arguments);
      };
    }();

    if (PartnerManager && platformArgs.length) {
      fetchPlatformFees();
    }
  }, [platformArgs, PartnerManager]);
  useEffect(function () {
    var partnerStocks = partnerFees[0],
        partnerCrypto = partnerFees[1],
        partnerForex = partnerFees[2];
    var platformStocks = platformFees[0],
        platformCrypto = platformFees[1],
        platformForex = platformFees[2]; // partner

    if (partnerStocks) {
      var _updatePartnerFee;

      var fee = partnerStocks;
      dispatch(updatePartnerFee((_updatePartnerFee = {}, _updatePartnerFee[Sector.STOCKS] = fee.toString(), _updatePartnerFee)));
    }

    if (partnerCrypto) {
      var _updatePartnerFee2;

      var _fee = partnerCrypto;
      dispatch(updatePartnerFee((_updatePartnerFee2 = {}, _updatePartnerFee2[Sector.CRYPTO] = _fee.toString(), _updatePartnerFee2)));
    }

    if (partnerForex) {
      var _updatePartnerFee3;

      var _fee2 = partnerForex;
      dispatch(updatePartnerFee((_updatePartnerFee3 = {}, _updatePartnerFee3[Sector.FOREX] = _fee2.toString(), _updatePartnerFee3)));
    } // platform


    if (platformStocks) {
      var _updatePlatformFee;

      var _fee3 = platformStocks;
      dispatch(updatePlatformFee((_updatePlatformFee = {}, _updatePlatformFee[Sector.STOCKS] = _fee3.toString(), _updatePlatformFee)));
    }

    if (platformCrypto) {
      var _updatePlatformFee2;

      var _fee4 = platformCrypto;
      dispatch(updatePlatformFee((_updatePlatformFee2 = {}, _updatePlatformFee2[Sector.CRYPTO] = _fee4.toString(), _updatePlatformFee2)));
    }

    if (platformForex) {
      var _updatePlatformFee3;

      var _fee5 = platformForex;
      dispatch(updatePlatformFee((_updatePlatformFee3 = {}, _updatePlatformFee3[Sector.FOREX] = _fee5.toString(), _updatePlatformFee3)));
    }
  }, [dispatch, platformFees, partnerFees]);
  return null;
}

function Updater$3() {
  var thunkDispatch = useAppDispatch();

  var _useApplicationState = useApplicationState(),
      forceRefresh = _useApplicationState.forceRefresh;

  useEffect(function () {
    var loop = setInterval(function () {
      return thunkDispatch(fetchQuotes());
    }, 60 * 1000);
    thunkDispatch(fetchQuotes());
    return function () {
      return clearInterval(loop);
    };
  }, [thunkDispatch]); // ignore initial effect

  useEffect(function () {
    if (forceRefresh) {
      console.info('Forcing a quote refresh');
      thunkDispatch(fetchQuotes());
    }
  }, [forceRefresh]);
  return null;
}

function Updater$4() {
  var thunkDispatch = useAppDispatch();

  var _useApplicationState = useApplicationState(),
      forceRefresh = _useApplicationState.forceRefresh;

  useEffect(function () {
    thunkDispatch(fetchSignatures());
  }, [thunkDispatch]); // ignore initial effect

  useEffect(function () {
    if (forceRefresh) {
      console.info('Forcing a signatures refresh');
      thunkDispatch(fetchSignatures());
    }
  }, [forceRefresh]);
  return null;
}

function Updaters(_ref) {
  var chainId = _ref.chainId,
      partnerId = _ref.partnerId;
  return React.createElement(React.Fragment, null, React.createElement(Updater, null), React.createElement(Updater$1, null), React.createElement(Updater$2, {
    chainId: chainId,
    partnerId: partnerId
  }), React.createElement(Updater$3, null), React.createElement(Updater$4, null));
}

function Provider(_ref) {
  var chainId = _ref.chainId,
      partnerId = _ref.partnerId,
      children = _ref.children;
  return React.createElement(Provider$1, {
    store: store
  }, React.createElement(React.Fragment, null, React.createElement(Updaters, {
    chainId: chainId,
    partnerId: partnerId
  }), children));
}

var addresses = {
  Collateral: Collateral,
  Conductor: Conductor,
  PartnerManager: PartnerManager,
  RoleChecker: RoleChecker,
  Synchronizer: Synchronizer
};

export { Direction, MuonClient, Sector, SupportedChainId, Provider as SynchronizerProvider, addresses, useForceRefreshCallback, usePartnerFeeCallback, usePlatformFeeCallback, useRegistrarByContract, useRegistrarPairs, useRegistrarTokenMap, useRegistrarTokens, useRegistrars, useTotalFeeCallback };
//# sourceMappingURL=synchronizer-sdk.esm.js.map
