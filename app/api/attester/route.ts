import { NextRequest, NextResponse } from 'next/server'
import { getPendingRequests, createAttestation } from '../../../lib/attesterService'

export async function GET() {
  try {
    const pendingRequests = await getPendingRequests()
    return NextResponse.json({ success: true, pendingRequests })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { requestId, checkpoint, farmerAddress, ipfsHash } = await req.json()
  try {
    const attestationUID = await createAttestation(requestId, checkpoint, farmerAddress, ipfsHash)
    return NextResponse.json({ success: true, message: 'Attestation created successfully', attestationUID })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}