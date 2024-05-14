import manifest from './src/dojo/generated/manifests/manifest.json'
import { createDojoConfig } from '@dojoengine/core'

// Uncomment to run locally
// const rpc_url =
// const torii_url =

// Uncomment to run with Cartridge slots
const rpc_url = import.meta.env.VITE_RPC_URL || 'http://localhost:5050/'
const torii_url = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8080/graphql'
const masterAddress =
  import.meta.env.MASTER_ADDRESS ||
  '0x4883e4718cbb2c6c10ac41c5903182ca69f81b496c5666a75ca927633244635'
const masterPrivateKey =
  import.meta.env.MASTER_PRIVATE_KEY ||
  '0x4d2d036ed52c6c3795efef6d9207169c498682a479434aea9c30598936cff3a'

  export const dojoConfig = createDojoConfig({
  manifest,
  rpcUrl: rpc_url,
  toriiUrl: torii_url,
  masterAddress,
  masterPrivateKey,
})
