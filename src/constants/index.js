import AMM_ABI_ETH from './abi/AMM_ABI_ETH.json'
import AMM_ABI_BSC from './abi/AMM_ABI_BSC.json'
import AMM_ABI_HECO from './abi/AMM_ABI_HECO.json'
// import AMM_ABI_XDAI from './abi/AMM_ABI_XDAI.json'
import AMM_ABI_POLYGON from './abi/AMM_ABI_POLYGON.json'

export const SUPPORTED_CHAINS_BY_NAME = {
  MAINNET: 1,
  BSC: 56,
  // XDAI: 100,
  HECO: 128,
  POLYGON: 137,
}

export const SUPPORTED_CHAINS_BY_CHAIN_ID = {
  1: 'MAINNET',
  56: 'BSC',
  // 100: 'XDAI',
  128: 'HECO',
  137: 'POLYGON',
}

export const SYNCHRONIZER_ADDRESSES_BY_CHAIN_ID = {
  1: '0x7a27a7BF25d64FAa090404F94606c580ce8E1D37',
  56: '0x3b62f3820e0b035cc4ad602dece6d796bc325325',
  // 100: '0x89951F2546f36789072c72C94272a68970Eba65e', // wxDAI proxy
  128: '0xe82aa18b107aaf8D3829111C91CD0D133E0773DC',
  137: '0x5e16B021994e3c2536435CA3A45f0dA6536eD315'
}

export const SYNCHRONIZER_ABI_BY_CHAIN_ID = {
  1: AMM_ABI_ETH,
  56: AMM_ABI_BSC,
  // 100: AMM_ABI_XDAI,
  128: AMM_ABI_HECO,
  137: AMM_ABI_POLYGON,
}

export const SUPPORTED_PAIRS_BY_CHAIN_ID = {
  1: {
    symbol: 'DAI',
    isToken: true,
    contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  56: {
    symbol: 'BUSD',
    isToken: true,
    contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    decimals: 18,
  },
  // 100: {
  //   symbol: 'xDAI',
  //   isToken: false,
  //   contract: '0x0000000000000000000000000000000000000001',
  //   decimals: 18,
  // },
  128: {
    symbol: 'HUSD',
    isToken: true,
    contract: '0x0298c2b32eae4da002a15f36fdf7615bea3da047',
    decimals: 8,
  },
  137: {
    symbol: 'USDC',
    isToken: true,
    contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    decimals: 6,
  },
}
