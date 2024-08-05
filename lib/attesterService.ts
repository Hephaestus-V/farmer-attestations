import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { getPendingAttestationRequests, updateAttestationStatus } from './database';
import { getFromIPFS } from './ipfsService';
import { EAS_CONTRACT_ADDRESS, signer } from "./config";
import { SCHEMAS, CheckpointType } from './schema';

const eas = new EAS(EAS_CONTRACT_ADDRESS);
eas.connect(signer);

export async function getPendingRequests() {
  return await getPendingAttestationRequests();
}

export async function createAttestation(requestId: number, checkpoint: CheckpointType, farmerAddress: string, ipfsHash: string) {
  const schema = SCHEMAS[checkpoint];
  if (!schema) {
    throw new Error('Invalid checkpoint');
  }

  const data = await getFromIPFS(ipfsHash);
  const schemaEncoder = new SchemaEncoder(schema.schema);

  let encodedData;
  if (checkpoint === 'PRE_SOWING') {
    encodedData = schemaEncoder.encodeData([
      { name: "farmer", value: farmerAddress, type: "address" },
      { name: "soilFertilityReportHash", value: data.soilFertilityReportHash, type: "string" },
      { name: "landPreparationDetails", value: data.landPreparationDetails, type: "string" },
      { name: "weatherData", value: data.weatherData, type: "string" },
      { name: "cropTypeSelected", value: data.cropTypeSelected, type: "string" },
      { name: "timestamp", value: Math.floor(Date.now() / 1000), type: "uint256" },
    ]);
  } else if (checkpoint === 'MID_GROWTH') {
    // Encode data for MID_GROWTH checkpoint
  } else if (checkpoint === 'PRE_HARVEST') {
    // Encode data for PRE_HARVEST checkpoint
  }

  const tx = await eas.attest({
    schema: schema.uid,
    data: {
      recipient: farmerAddress,
      expirationTime: BigInt(0),
      revocable: true,
      data: String(encodedData),
    },
  });

  const newAttestationUID = await tx.wait();
  console.log("New attestation UID:", newAttestationUID);

  await updateAttestationStatus(requestId, 'attested');

  return newAttestationUID;
}