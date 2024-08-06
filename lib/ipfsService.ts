// lib/pinataService.ts

import axios from 'axios';

const JWT = process.env.PINATA_JWT as string; // Your Pinata JWT


export async function uploadToIPFS(data: any): Promise<string> {
    console.log("hi from uploadIPFS "+console.log(process.env.PINATA_JWT))
    // const jsonString = JSON.stringify(data, (key, value) =>
    //     typeof value === 'bigint' ? value.toString() : value
    // );
    
  
  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWT}`
        }
      }
    );
    
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

export async function getFromIPFS(hash: string): Promise<any> {
  try {
    const response = await axios.get(`https://chocolate-odd-mole-398.mypinata.cloud/ipfs/${hash}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
}
