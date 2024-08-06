'use client'

import FarmerForm from '../../components/FarmerForm'
import { CheckpointType } from '../../lib/schema'

export default function FarmerPage() {
  const handleSubmit = async (farmerAddress: string, checkpoint: CheckpointType, data: any) => {
    console.log("hifrom farmer page")
    console.log(data)
    const response = await fetch('/api/farmer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farmerAddress, checkpoint, data })
    })
    const result = await response.json()
    if (result.success) {
      alert(`Attestation request submitted successfully. IPFS Hash: ${result.ipfsHash}`)
    } else {
      alert(`Error: ${result.message}`)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
      <FarmerForm onSubmit={handleSubmit} />
    </div>
  )
}