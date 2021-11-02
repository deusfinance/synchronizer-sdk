import { DeusClient } from '../src/index.js'

const providerMapping = [
  'https://oracle1.deus.finance',
  'https://oracle2.deus.finance',
  'https://oracle3.deus.finance',
]

const chainId = 1

describe('client methods', () => {
  const Client = new DeusClient({
    providerMapping: providerMapping,
    chainId: chainId,
  })

  test("defines getMethods()", () => {
    expect(typeof Client.getMethods).toBe("function");
  })

  test("defines getSignatures()", () => {
    expect(typeof Client.getSignatures).toBe("function");
  })

  test("defines getConducted()", () => {
    expect(typeof Client.getConducted).toBe("function");
  })

  test("defines getQuotes()", () => {
    expect(typeof Client.getQuotes).toBe("function");
  })

  test("defines getDetails()", () => {
    expect(typeof Client.getDetails).toBe("function");
  })

  test("defines setChainId()", () => {
    expect(typeof Client.setChainId).toBe("function");
  })

  test("defines constants()", () => {
    expect(typeof Client.constants).toBe("object");
    expect(Client.constants).toHaveProperty('SUPPORTED_CHAINS_BY_NAME')
    expect(Client.constants).toHaveProperty('SUPPORTED_CHAINS_BY_CHAIN_ID')
    expect(Client.constants).toHaveProperty('SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID')
    expect(Client.constants).toHaveProperty('ABI')
  })

})
