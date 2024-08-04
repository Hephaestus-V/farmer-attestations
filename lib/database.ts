import { db } from './config'

const TABLE_NAME = 'farmer_attestations_420_1' // Replace with your actual table name

export async function createTable() {
  const { meta: create } = await db
    .prepare(`CREATE TABLE ${TABLE_NAME} (
      id integer primary key,
      farmer_address text,
      checkpoint text,
      ipfs_hash text,
      status text,
      timestamp integer
    );`)
    .run()

  await create.txn.wait()
  console.log(`Table ${TABLE_NAME} created successfully`)
}

export async function insertAttestationRequest(farmerAddress: string, checkpoint: string, ipfsHash: string) {
  const { meta: insert } = await db
    .prepare(`INSERT INTO ${TABLE_NAME} (farmer_address, checkpoint, ipfs_hash, status, timestamp) VALUES (?, ?, ?, ?, ?);`)
    .bind(farmerAddress, checkpoint, ipfsHash, 'pending', Math.floor(Date.now() / 1000))
    .run()

  await insert.txn.wait()
}

export async function getPendingAttestationRequests() {
  const { results } = await db.prepare(`SELECT * FROM ${TABLE_NAME} WHERE status = 'pending';`).all()
  return results
}

export async function updateAttestationStatus(id: number, status: string) {
  const { meta: update } = await db
    .prepare(`UPDATE ${TABLE_NAME} SET status = ? WHERE id = ?;`)
    .bind(status, id)
    .run()

  await update.txn.wait()
}