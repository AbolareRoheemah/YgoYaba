import react from 'react';
import * as dotenv from "dotenv";
import { PinataSDK } from "pinata-web3";
dotenv.config();

export default function useStorage () {
    const pinata = new PinataSDK({
        pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjOWZmMzBmZS1mMzg5LTRjYjctYjI4Zi1hZGY4ZThiMWExYjciLCJlbWFpbCI6ImFib2xhcmVyb2hlZW1haEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGMwMzlmNjVkNDNmN2RiMGExOGEiLCJzY29wZWRLZXlTZWNyZXQiOiJlOWEwN2FlODY1ZTIxMjEyYWJmMzgzNGU2Mzc3NDMyYTFhODYwMjEyZjY1NmM2MjEyMjU3MmM2ODA3Njg3ZTg1IiwiZXhwIjoxNzU5MTU0ODQzfQ.N6DgLtwT5u8ffmMenFcjPlBtNdZPLRcSaPTl-43IBfE",
        pinataGateway: "lavender-bitter-catfish-379.mypinata.cloud",
      });
      
      async function uploadJson(itemData) {
          const jsonFile = JSON.stringify(itemData);
          try {
            const file = new File([jsonFile], "data.json", { type: "application/json" });
            const upload = await pinata.upload.file(file);
            console.log("{upload}", upload.IpfsHash);
            return upload.IpfsHash
          } catch (error) {
            console.log(error);
            return;
          }
      }
        
      async function getUploadedFile(hash) {
        console.log({ hash });
        try {
          const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjOWZmMzBmZS1mMzg5LTRjYjctYjI4Zi1hZGY4ZThiMWExYjciLCJlbWFpbCI6ImFib2xhcmVyb2hlZW1haEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGMwMzlmNjVkNDNmN2RiMGExOGEiLCJzY29wZWRLZXlTZWNyZXQiOiJlOWEwN2FlODY1ZTIxMjEyYWJmMzgzNGU2Mzc3NDMyYTFhODYwMjEyZjY1NmM2MjEyMjU3MmM2ODA3Njg3ZTg1IiwiZXhwIjoxNzU5MTU0ODQzfQ.N6DgLtwT5u8ffmMenFcjPlBtNdZPLRcSaPTl-43IBfE`,
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error("Error retrieving file:", error); // Improved error logging
        }
      }

    return {
        uploadJson,
        getUploadedFile
    }
}
