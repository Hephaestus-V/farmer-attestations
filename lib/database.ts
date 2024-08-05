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
    console.log("hi from insertAtttestationRequest")
    const tableName = "farmer_attestations_11155420_131"
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${tableName} (farmer_address, checkpoint, ipfs_hash, status, timestamp) VALUES (?, ?, ?, ?, ?);`)
      .bind(farmerAddress, checkpoint, ipfsHash, 'pending', Math.floor(Date.now() / 1000))
      .run()
  
    await insert?.txn?.wait() ?? Promise.resolve()
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE status = 'pending';`).all()
    console.log(JSON.stringify(results))
  }
  
  export async function getPendingAttestationRequests() {
    console.log("hie from getPendingAttestations")
    const tableName = "farmer_attestations_11155420_131"
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE status = 'pending';`).all()
    return results
  }
  
  export async function updateAttestationStatus(id: number, status: string) {
    const tableName = "farmer_attestations_11155420_131"
    const { meta: update } = await db
      .prepare(`UPDATE ${tableName} SET status = ? WHERE id = ?;`)
      .bind(status, id)
      .run()
  
    await update?.txn?.wait() ?? Promise.resolve()
  }