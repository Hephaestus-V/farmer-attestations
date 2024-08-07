import { NextRequest, NextResponse } from 'next/server'
import { submitAttestationRequest } from '../../../lib/farmerService'

export async function POST(req: NextRequest) {
  const { farmerAddress, checkpoint, data } = await req.json()
  try {
    console.log("Submitting attestation for", checkpoint)
    console.log(data)
    const ipfsHash = await submitAttestationRequest(farmerAddress, checkpoint, data)
    return NextResponse.json({ success: true, message: 'Attestation request submitted successfully', ipfsHash })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit attestation request' }, { status: 500 })
  }
}