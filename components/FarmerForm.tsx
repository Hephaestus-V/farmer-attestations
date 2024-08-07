import React, { useState } from 'react'
import { CheckpointType } from '../lib/schema'

interface FarmerFormProps {
  checkpoint: CheckpointType
  onSubmit: (farmerAddress: string, checkpoint: CheckpointType, data: any) => void
  onCancel: () => void
}

const FarmerForm: React.FC<FarmerFormProps> = ({ checkpoint, onSubmit, onCancel }) => {
  const [farmerAddress, setFarmerAddress] = useState('')
  const [formData, setFormData] = useState<any>({})
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        const dataWithFile = {
          ...formData,
          file: base64String,
        }
        onSubmit(farmerAddress, checkpoint, dataWithFile)
      }
      reader.readAsDataURL(file)
    } else {
      onSubmit(farmerAddress, checkpoint, formData)
    }
  }

  const renderFormFields = () => {
    switch (checkpoint) {
      case 'PRE_SOWING':
        return (
          <>
            <input
              type="text"
              value={formData.soilType || ''}
              onChange={(e) => setFormData({...formData, soilType: e.target.value})}
              placeholder="Soil Type"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={formData.cropType || ''}
              onChange={(e) => setFormData({...formData, cropType: e.target.value})}
              placeholder="Crop Type"
              className="w-full p-2 border rounded"
            />
          </>
        )
      case 'MID_GROWTH':
        return (
          <>
            <input
              type="text"
              value={formData.plantHeight || ''}
              onChange={(e) => setFormData({...formData, plantHeight: e.target.value})}
              placeholder="Plant Height"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={formData.pestControl || ''}
              onChange={(e) => setFormData({...formData, pestControl: e.target.value})}
              placeholder="Pest Control Measures"
              className="w-full p-2 border rounded"
            />
          </>
        )
      case 'PRE_HARVEST':
        return (
          <>
            <input
              type="text"
              value={formData.expectedYield || ''}
              onChange={(e) => setFormData({...formData, expectedYield: e.target.value})}
              placeholder="Expected Yield"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={formData.harvestDate || ''}
              onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
              placeholder="Estimated Harvest Date"
              className="w-full p-2 border rounded"
            />
          </>
        )
      default:
        return null
    }
  }

  if (!checkpoint) {
    return null; // or return a loading state or error message
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{checkpoint.replace('_', ' ')} Form</h2>
      <input
        type="text"
        value={farmerAddress}
        onChange={(e) => setFarmerAddress(e.target.value)}
        placeholder="Farmer Address"
        required
        className="w-full p-2 border rounded"
      />
      {renderFormFields()}
      <input
        type="file"
        accept=".png"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-4">
        <button type="submit" className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit Attestation Request
        </button>
        <button type="button" onClick={onCancel} className="flex-1 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default FarmerForm