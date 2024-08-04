import { insertAttestationRequest } from './database'
import { uploadToIPFS } from './ipfsService'
import { SCHEMAS, CheckpointType } from './schema'

export async function submitAttestationRequest(farmerAddress: string, checkpoint: CheckpointType, data: any): Promise<string> {
  if (!SCHEMAS[checkpoint]) {
    throw new Error('Invalid checkpoint')
  }

  const ipfsHash = await uploadToIPFS(data)
  await insertAttestationRequest(farmerAddress, checkpoint, ipfsHash)

  console.log(`Attestation request submitted for farmer ${farmerAddress} at checkpoint ${checkpoint}`)
  return ipfsHash
}