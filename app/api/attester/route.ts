import { NextRequest, NextResponse } from 'next/server'
import { getPendingRequests, createAttestation } from '../../../lib/attesterService'

export async function GET() {
  try {
    console.log("hi from get")
    const pendingRequests = await getPendingRequests()
    return NextResponse.json({ success: true, pendingRequests })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
    console.log("hi from post")
  const { requestId, checkpoint, farmerAddress, ipfsHash } = await req.json()
  console.log(ipfsHash)
  try {
    const attestationUID = await createAttestation(requestId,farmerAddress, checkpoint , ipfsHash)
    return NextResponse.json({ success: true, message: 'Attestation created successfully', attestationUID })
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 })
  }
}