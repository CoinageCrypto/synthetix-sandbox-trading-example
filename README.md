# Synthetix Trading Example

This repo contains a reproduction for the error we're experiencing while trying to integrate our smart account
contract with the Synthetix contracts.

There are two tests in `test/test.ts`:

- `Should be able to create an account via PerpsMarketProxy from TypeScript`: This succeeds.
- `Should be able to create an account via PerpsMarketProxy from a contract`: This does the following
  - Deploys an instance of `Test.sol`
  - The `Test` contract has a function (`test(address)`) which takes any address you pass into it, casts it to IAccountModule, then calls createAccount() on it
  - There didn't seem to be a set of contract interfaces I could use directly (because they import the storage interfaces, which then import the whole system seemingly),
    so IAccountModule was sourced from the synthetix-v3 repo but was modified to not haul in all of your contracts. Either way, I can't see how the ABI that's being provided
    via this interface is any different from what I'm providing to Ethers.

Example output:

```console
hardhat test

No need to generate any newer typings.


  Synthetix v3
Nothing to compile
No need to generate any newer typings.


Using Frame as the default registry provider. If you don't have Frame installed cannon defaults to: https://ethereum.publicnode.com/ when publishing to the registry.
Set a custom registry provider url in your settings (run cannon setup) or pass it as an env variable (CANNON_REGISTRY_PROVIDER_URL).


Checking IPFS for package synthetix-trading-example:0.0.1@main with chain Id 13370...

Existing package found.

Using package...
Name: synthetix-trading-example
Version: 0.0.1
Preset: main (default)
Source code will be included in the package

Building the chain (ID 13370)...
Successfully built package synthetix-trading-example:0.0.1@main
 - Deploy Url: ipfs://QmTh6p8Xm3VrV4gWxCX6RBnP57uYw2sHAjvTMBFdF6YQqs

    1) Should be able to create an account via PerpsMarketProxy from a contract
{
  to: '0x4cdA35460f9cD8aDfdD08478376C7979A9a08277',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { value: "245915" },
  logsBloom: '0x08000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000010008000000000000000000000000000000000000000000000000020000000000000104000800000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000002000000200000000000000000000000202200000000000010000020000000020000000000000000000000000000000000000000000000000000402000',
  blockHash: '0x912183f0cd36354a3f6d698e15c4076c30c42079d50ec2616ab2b3cdf250d2fb',
  transactionHash: '0x52bfa9b2578f7b0bafff064581515e4dc9c5e06d4d3efed45df34c09c63a76ad',
  logs: [
    {
      transactionIndex: 0,
      blockNumber: 3,
      transactionHash: '0x52bfa9b2578f7b0bafff064581515e4dc9c5e06d4d3efed45df34c09c63a76ad',
      address: '0x66362F85CB768f96038616B5398792e4edDca85E',
      topics: [Array],
      data: '0x',
      logIndex: 0,
      blockHash: '0x912183f0cd36354a3f6d698e15c4076c30c42079d50ec2616ab2b3cdf250d2fb'
    },
    {
      transactionIndex: 0,
      blockNumber: 3,
      transactionHash: '0x52bfa9b2578f7b0bafff064581515e4dc9c5e06d4d3efed45df34c09c63a76ad',
      address: '0x4cdA35460f9cD8aDfdD08478376C7979A9a08277',
      topics: [Array],
      data: '0x',
      logIndex: 1,
      blockHash: '0x912183f0cd36354a3f6d698e15c4076c30c42079d50ec2616ab2b3cdf250d2fb'
    }
  ],
  blockNumber: 3,
  confirmations: 1,
  cumulativeGasUsed: BigNumber { value: "245915" },
  effectiveGasPrice: BigNumber { value: "2268734430" },
  status: 1,
  type: 2,
  byzantium: true
}
    ✔ Should be able to create an account via PerpsMarketProxy from TypeScript


  1 passing (6s)
  1 failing

  1) Synthetix v3
       Should be able to create an account via PerpsMarketProxy from a contract:
     Error: transaction failed [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (transactionHash="0x2d8fd6626409d6196e3e478d380a26250d43086c7f6830fd127c2bb1000ef62a", transaction={"type":2,"chainId":13370,"nonce":23,"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0xd09dc300"},"gasPrice":null,"gasLimit":{"type":"BigNumber","hex":"0x01bad9d8"},"to":"0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1","value":{"type":"BigNumber","hex":"0x00"},"data":"0xbb29998e0000000000000000000000004cda35460f9cd8adfdd08478376c7979a9a08277","accessList":[],"hash":"0x2d8fd6626409d6196e3e478d380a26250d43086c7f6830fd127c2bb1000ef62a","v":1,"r":"0x626e3fa2c26dcbc5c5c6ee04dad7aff3b2aae1dc28ff535e62bcfbf202c7d36c","s":"0x22a7df0fa801cc69163b5807ba6af0a6cb5a4310fb1cc26a5977b79c53f30a1f","from":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","confirmations":0}, receipt={"to":"0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1","from":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","contractAddress":null,"transactionIndex":0,"gasUsed":{"type":"BigNumber","hex":"0x03cb23"},"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","blockHash":"0x630809aaf15a0b04baa8c070d7866773c2b61ecab99974a87c514d2347b63db6","transactionHash":"0x2d8fd6626409d6196e3e478d380a26250d43086c7f6830fd127c2bb1000ef62a","logs":[],"blockNumber":2,"confirmations":1,"cumulativeGasUsed":{"type":"BigNumber","hex":"0x03cb23"},"effectiveGasPrice":{"type":"BigNumber","hex":"0x8da62ea7"},"status":0,"type":2,"byzantium":true}, code=CALL_EXCEPTION, version=providers/5.7.2)
      at Logger.makeError (node_modules/.pnpm/@ethersproject+logger@5.7.0/node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
      at Logger.throwError (node_modules/.pnpm/@ethersproject+logger@5.7.0/node_modules/@ethersproject/logger/src.ts/index.ts:281:20)
      at CannonWrapperJsonRpcProvider.<anonymous> (node_modules/.pnpm/@ethersproject+providers@5.7.2/node_modules/@ethersproject/providers/src.ts/base-provider.ts:1549:24)
      at step (node_modules/.pnpm/@ethersproject+providers@5.7.2/node_modules/@ethersproject/providers/lib/base-provider.js:48:23)
      at Object.next (node_modules/.pnpm/@ethersproject+providers@5.7.2/node_modules/@ethersproject/providers/lib/base-provider.js:29:53)
      at fulfilled (node_modules/.pnpm/@ethersproject+providers@5.7.2/node_modules/@ethersproject/providers/lib/base-provider.js:20:58)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)

```

I am not sure how I should be integrating at the Solidity level with the system.
