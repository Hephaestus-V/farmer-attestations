import React, { useState } from 'react'
import { CheckpointType } from '../lib/schema'

interface FarmerFormProps {
  onSubmit: (farmerAddress: string, checkpoint: CheckpointType, data: any) => void
}

const FarmerForm: React.FC<FarmerFormProps> = ({ onSubmit }) => {
  const [farmerAddress, setFarmerAddress] = useState('')
  const [checkpoint, setCheckpoint] = useState<CheckpointType>('PRE_SOWING')
  const [formData, setFormData] = useState<any>({"name":"hii"})
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (file) {
        console.log("hi from file upload")
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        const dataWithFile = {
          ...formData,
          file: base64String, // You can send the file as a base64 string or a Blob
        }
        console.log(dataWithFile)
        onSubmit(farmerAddress, checkpoint, dataWithFile)
      }
      reader.readAsDataURL(file) // Reads file as base64 string
    } else {
        console.log("hi from else ")
      onSubmit(farmerAddress, checkpoint, formData)
    }
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

      <input
        type="file"
        accept=".png"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Attestation Request
      </button>
    </form>
  )
}

export default FarmerForm
