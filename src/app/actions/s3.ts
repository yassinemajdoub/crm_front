"use server"

import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.ACCESS_KEY, // Access the ACCESS_KEY environment variable
  secretAccessKey: process.env.SECRET_KEY, // Access the SECRET_KEY environment variable
  region: process.env.REGION, // Access the REGION environment variable
  endpoint: process.env.ENDPOINT, // Use your Contabo endpoint
  s3ForcePathStyle: true, // This is often required for custom endpoints
  signatureVersion: "v4",
 });
 
export default async function getSignedUrl(fileType: string, fileName: string, folder: string) 
{

  const key = `${folder}/${fileName}-${randomUUID()}.${fileType}`;

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: `image/${fileType}`,
};

  console.log("am here ")
  
  const uploadUrl = await s3.getSignedUrl("putObject", s3Params);
  console.log("upload url is  : ", uploadUrl)

  return {
    uploadUrl,
    key: key,
  }
  
}
