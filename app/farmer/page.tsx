'use client'

import React, { useState } from 'react'
import FarmerForm from '../../components/FarmerForm'
import { CheckpointType } from '../../lib/schema'

const checkpoints: CheckpointType[] = ['PRE_SOWING', 'MID_GROWTH', 'PRE_HARVEST']

export default function FarmerPage() {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointType | null>(null)

  const handleSubmit = async (farmerAddress: string, checkpoint: CheckpointType, data: any) => {
    console.log("Submitting data for", checkpoint)
    console.log(data)
    const response = await fetch('/api/farmer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farmerAddress, checkpoint, data })
    })
    const result = await response.json()
    if (result.success) {
      alert(`Attestation request submitted successfully. IPFS Hash: ${result.ipfsHash}`)
      setSelectedCheckpoint(null) // Reset selected checkpoint after submission
    } else {
      alert(`Error: ${result.message}`)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
      {!selectedCheckpoint ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {checkpoints.map((checkpoint) => (
            <div 
              key={checkpoint} 
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedCheckpoint(checkpoint)}
            >
              <h2 className="text-xl font-semibold mb-2">{checkpoint.replace('_', ' ')}</h2>
              <p>Click to fill form for {checkpoint.toLowerCase().replace('_', ' ')} checkpoint</p>
            </div>
          ))}
        </div>
      ) : (
        <FarmerForm 
          checkpoint={selectedCheckpoint} 
          onSubmit={handleSubmit} 
          onCancel={() => setSelectedCheckpoint(null)}
        />
      )}
    </div>
  )
}