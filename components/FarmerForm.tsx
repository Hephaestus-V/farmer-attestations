import React, { useState } from 'react'
import { CheckpointType } from '../lib/schema'

interface FarmerFormProps {
  onSubmit: (farmerAddress: string, checkpoint: CheckpointType, data: any) => void
}

const FarmerForm: React.FC<FarmerFormProps> = ({ onSubmit }) => {
  const [farmerAddress, setFarmerAddress] = useState('')
  const [checkpoint, setCheckpoint] = useState<CheckpointType>('PRE_SOWING')
  const [formData, setFormData] = useState({
    farmer:"hei"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(farmerAddress, checkpoint, formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={farmerAddress}
        onChange={(e) => setFarmerAddress(e.target.value)}
        placeholder="Farmer Address"
        required
        className="w-full p-2 border rounded"
      />
      <select
        value={checkpoint}
        onChange={(e) => setCheckpoint(e.target.value as CheckpointType)}
        required
        className="w-full p-2 border rounded"
      >
        <option value="PRE_SOWING">Pre-Sowing</option>
        <option value="MID_GROWTH">Mid-Growth</option>
        <option value="PRE_HARVEST">Pre-Harvest</option>
      </select>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Attestation Request
      </button>
    </form>
  )
}

export default FarmerForm