import { create, IPFSHTTPClient } from 'ipfs-http-client'

const ipfs: IPFSHTTPClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' })

export async function uploadToIPFS(data: any): Promise<string> {
  const result = await ipfs.add(JSON.stringify(data))
  return result.path
}

export async function getFromIPFS(hash: string): Promise<any> {
  const stream = ipfs.cat(hash)
  let data = ''
  for await (const chunk of stream) {
    data += chunk.toString()
  }
  return JSON.parse(data)
}