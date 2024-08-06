import { NextRequest, NextResponse } from 'next/server'
import { submitAttestationRequest } from '../../../lib/farmerService'
import { getAttestationById } from '@/lib/database'

export async function POST(req: NextRequest) {
   
  const { farmerAddress, checkpoint, data } = await req.json()
  try {
    console.log("hei from post ")
    console.log(data)
    const ipfsHash = await submitAttestationRequest(farmerAddress, checkpoint, data)
    return NextResponse.json({ success: true, message: 'Attestation request submitted successfully'})
  } catch (error) {
    return NextResponse.json({ success: false}, { status: 500 })
  }
}