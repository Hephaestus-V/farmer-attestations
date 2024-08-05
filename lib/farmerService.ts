import { insertAttestationRequest } from './database'
import { uploadToIPFS } from './ipfsService'
import { SCHEMAS, CheckpointType } from './schema'

export async function submitAttestationRequest(farmerAddress: string, checkpoint: CheckpointType, data: any): Promise<string> {
  console.log("hi from submitAttestationRequest")
    if (!SCHEMAS[checkpoint]) {
    throw new Error('Invalid checkpoint')
  }

  const ipfsHash = await uploadToIPFS(data)
  try{ 
    await insertAttestationRequest(farmerAddress, checkpoint, ipfsHash)
    }catch(error){
        console.log(error)
    }
  console.log(ipfsHash+" this is ipfs hash")
  console.log(`Attestation request submitted for farmer ${farmerAddress} for checkpoint ${checkpoint}` )
  return ipfsHash
}