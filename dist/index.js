
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./synchronizer-sdk.cjs.production.min.js')
} else {
  module.exports = require('./synchronizer-sdk.cjs.development.js')
}
