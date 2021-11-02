import { trimTrailingSlash, isSupportedChainId, chainIdToNetworkName } from '../../src/utils/index.js'

describe('utils', () => {
  test("trims trailing slash", () => {
    expect(trimTrailingSlash('sometext/')).toBe('sometext')
    expect(trimTrailingSlash('sometext')).toBe('sometext')
  })

  test("chainId should be supported", () => {
    expect(isSupportedChainId(1)).toBe(true)
    expect(isSupportedChainId(56)).toBe(true)
    expect(isSupportedChainId(100)).toBe(true)
    expect(isSupportedChainId(128)).toBe(true)
    expect(isSupportedChainId(137)).toBe(true)
  })

  test("chainId should throw an error", () => {
    expect(() => {
      isSupportedChainId(0)
    }).toThrow()
  })

  test("should return networkName", () => {
    expect(typeof chainIdToNetworkName(1)).toBe('string')
    expect(typeof chainIdToNetworkName(56)).toBe('string')
    expect(typeof chainIdToNetworkName(100)).toBe('string')
    expect(typeof chainIdToNetworkName(128)).toBe('string')
    expect(typeof chainIdToNetworkName(137)).toBe('string')

    expect(chainIdToNetworkName(0)).toBe(null)
  })
})
