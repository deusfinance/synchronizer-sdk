import { trimTrailingSlash, throwErrorOnUnsupportedChainId, chainIdToNetworkName } from '../../src/utils/index.js'

describe('utils', () => {
  test("trims trailing slash", () => {
    expect(trimTrailingSlash('sometext/')).toBe('sometext')
    expect(trimTrailingSlash('sometext')).toBe('sometext')
  })

  test("chainId should be supported", () => {
    expect(throwErrorOnUnsupportedChainId(1)).toBe(true)
    expect(throwErrorOnUnsupportedChainId(56)).toBe(true)
    expect(throwErrorOnUnsupportedChainId(128)).toBe(true)
    expect(throwErrorOnUnsupportedChainId(137)).toBe(true)
  })

  test("xdai (temporary unsupported) should throw an error", () => {
    expect(() => {
      throwErrorOnUnsupportedChainId(100)
    }).toThrow()
  })

  test("should return networkName", () => {
    expect(typeof chainIdToNetworkName(1)).toBe('string')
    expect(typeof chainIdToNetworkName(56)).toBe('string')
    expect(typeof chainIdToNetworkName(128)).toBe('string')
    expect(typeof chainIdToNetworkName(137)).toBe('string')

    expect(chainIdToNetworkName(100)).toBe(null)
  })
})
