import { ethers } from 'ethers'
import { Database, helpers } from "@tableland/sdk"

export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021" // Optimism Sepolia testnet
export const SCHEMA_REGISTRY_ADDRESS = "0x4200000000000000000000000000000000000020" // Optimism testnet
export const RESOLVER_ADDRESS = "YOUR_DEPLOYED_RESOLVER_ADDRESS" // Replace with your deployed resolver address

const PRIVATE_KEY = process.env.PRIVATE_KEY as string

export const provider = new ethers.JsonRpcProvider("https://opt-sepolia.g.alchemy.com/v2/yjUfU9OSt23_GB8FtO_BUw67V2vU3TOo")
export const signer = new ethers.Wallet(PRIVATE_KEY, provider)

const chainId = 11155420 // Optimism Sepolia testnet
export const db = new Database({
  signer,
  baseUrl: helpers.getBaseUrl(chainId)
})