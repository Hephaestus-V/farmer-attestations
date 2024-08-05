import React, { useEffect, useState } from 'react'

interface AttestationRequest {
  id: number
  farmer_address: string
  checkpoint: string
  ipfs_hash: string
  status: string
  timestamp: number
}

const AttesterDashboard: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<AttestationRequest[]>([])

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  const fetchPendingRequests = async () => {
    console.log("hi from fetchpending req")
    const response = await fetch('/api/attester')
    const data = await response.json()
    console.log(JSON.stringify(data));
    if(response.status==200){
        setPendingRequests(data.pendingRequests)
    }
    else{
        console.log("Not working");
    }
    console.log("pendingreq"+pendingRequests)
  }

  const handleAttest = async (request: AttestationRequest) => {
    const response = await fetch('/api/attester', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: request.id,
        checkpoint: request.checkpoint,
        farmerAddress: request.farmer_address,
        ipfsHash: request.ipfs_hash
      })
    })
    const data = await response.json()
    if (data.success) {
      alert(`Attestation created successfully. UID: ${data.attestationUID}`)
      fetchPendingRequests()
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Attestation Requests</h2>
      <ul className="space-y-2">
        {pendingRequests.map((request) => (
          <li key={request.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>Farmer: {request.farmer_address} | Checkpoint: {request.checkpoint}</span>
            <button
              onClick={() => handleAttest(request)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Attest
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AttesterDashboard