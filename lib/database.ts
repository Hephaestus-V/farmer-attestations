import { db } from './config'

const prefix = 'farmer_attestations' // Replace with your actual table name
let actualTableName: string | null = null // This will store the actual table name

export async function createTable() {
  const { meta: create } = await db
    .prepare(`CREATE TABLE ${prefix} (
      id integer primary key,
      farmer_address text,
      checkpoint text,
      ipfs_hash text,
      status text,
      attestation_ipfs_hash text,
      timestamp integer
    );`)
    .run()
    
  actualTableName = create.txn?.name || null

  console.log(`Table ${prefix} created successfully`+ JSON.stringify(actualTableName))
}

function getTableName() {
  if (!actualTableName) {
    throw new Error("Table has not been created yet. Call createTable() first.")
  }
  return actualTableName
}

export async function insertAttestationRequest(farmerAddress: string, checkpoint: string, ipfsHash: string) {
  console.log("Inserting attestation request")
  const tableName = "farmer_attestations_11155420_138"
  const { meta: insert } = await db
    .prepare(`INSERT INTO ${tableName} (farmer_address, checkpoint, ipfs_hash, status, timestamp) VALUES (?, ?, ?, ?, ?);`)
    .bind(farmerAddress, checkpoint, ipfsHash, 'pending', Math.floor(Date.now() / 1000))
    .run()

  await insert?.txn?.wait() ?? Promise.resolve()
  console.log(`Attestation request inserted for farmer ${farmerAddress}`)
  console.log("table name ",actualTableName)
}

export async function getPendingAttestationRequests() {
  console.log("Fetching pending attestation requests")
  const tableName = "farmer_attestations_11155420_138"
  const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE status = 'pending';`).all()
  return results
}

export async function updateAttestationStatus(id:number,address: string, status: string, attestationIpfsHash: string | null = null) {
  const tableName = "farmer_attestations_11155420_138"
  let query = `UPDATE ${tableName} SET status = ? WHERE id = ?;`
  let params = [status, id]

  if (attestationIpfsHash) {
    query = `UPDATE ${tableName} SET status = ?, attestation_ipfs_hash = ? WHERE id = ?;`
    params = [status, attestationIpfsHash, id]
  }

  const { meta: update } = await db
    .prepare(query)
    .bind(...params)
    .run()

  await update?.txn?.wait() ?? Promise.resolve()
  console.log(`Attestation status updated for farmer ${address}`)
}

export async function getAttestationById(address: string) {
  const tableName = "farmer_attestations_11155420_138"
  const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE farmer_address = ?;`).bind(address).all()
  return results[0] || null
}