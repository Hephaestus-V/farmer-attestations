import { NextRequest, NextResponse } from 'next/server'
import { submitAttestationRequest } from '../../../lib/farmerService'

export async function POST(req: NextRequest) {
    console.log("hi from post")
  const { farmerAddress, checkpoint, data } = await req.json()
  try {
    console.log("hei from post ")
    const ipfsHash = await submitAttestationRequest(farmerAddress, checkpoint, data)
    return NextResponse.json({ success: true, message: 'Attestation request submitted successfully'})
  } catch (error) {
    return NextResponse.json({ success: false}, { status: 500 })
  }
}