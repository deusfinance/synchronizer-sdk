export const ConductorABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'roleChecker_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: '_id',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'short',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'long',
        type: 'address',
      },
    ],
    name: 'Conducted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidatedRegistrar',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newRegistrar',
        type: 'address',
      },
    ],
    name: 'Liquidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_id',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shortName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shortSymbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'longName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'longSymbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'registrarType',
        type: 'uint256',
      },
    ],
    name: 'conduct',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'registrar',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'liquidatedName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'liquidatedSymbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
    ],
    name: 'liquidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'roleChecker',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'roleChecker_',
        type: 'address',
      },
    ],
    name: 'setRoleChecker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
