import { DeusClient } from '../src/index.js'

const providers = [
  'https://oracle1.deus.finance',
  'https://oracle2.deus.finance',
  'https://oracle3.deus.finance',
]

const chainId = 1
const minimumSignatures = 2

describe('client methods', () => {
  const Client = new DeusClient({
    providers: providers,
    chainId: chainId,
    minimumSignatures: minimumSignatures,
  })

  test("defines getMethods()", () => {
    expect(typeof Client.getMethods).toBe("function");
  })

  test("defines setChainId()", () => {
    expect(typeof Client.setChainId).toBe("function");
  })

  test("defines oracles()", () => {
    expect(typeof Client.oracles).toBe("object");
    expect(typeof Client.oracles.getSignatures).toBe("function");
    expect(typeof Client.oracles.getConducted).toBe("function");
    expect(typeof Client.oracles.getQuotes).toBe("function");
    expect(typeof Client.oracles.getDetails).toBe("function");
  })

  test("defines constants()", () => {
    expect(typeof Client.constants).toBe("object");
    expect(Client.constants).toHaveProperty('SUPPORTED_CHAINS_BY_NAME')
    expect(Client.constants).toHaveProperty('SUPPORTED_CHAINS_BY_CHAIN_ID')
    expect(Client.constants).toHaveProperty('SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID')
    expect(Client.constants).toHaveProperty('SYNCHRONIZER_ABI_BY_CHAIN_ID')
    expect(Client.constants).toHaveProperty('SUPPORTED_PAIRS_BY_CHAIN_ID')
    expect(Client.constants).toHaveProperty('SUPPORTED_CHAIN_IDS')
  })

  test("defines functions()", () => {
    expect(typeof Client.functions).toBe("object");
    expect(typeof Client.functions.prepareSignatureParams).toBe('function')
  })

  test("defines utils()", () => {
    expect(typeof Client.utils).toBe("object");
    expect(typeof Client.utils.isSupportedChainId).toBe('function')
  })
})
