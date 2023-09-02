import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';

const REGION = "sa-east-1";

const s3Client = new S3Client({
  region: REGION,
})

const uploadFile = async(file: any) => {
  const fileStream = createReadStream(file.path)

  const uploadParams = new PutObjectCommand({
    Bucket: "elysium-books",
    Key: fileStream as any,
    Body: file.filename
  })

  try {
    const results = await s3Client.send(uploadParams)
    console.log("Criado com sucesso")

    return results
  } catch (error) {
    console.log(error)
  }
  
  return uploadParams
}

const getFileStream = async(fileKey: any) => {
  const getFile = new GetObjectCommand({
    Key: fileKey,
    Bucket: "elysium-books"
  })

  const response = await s3Client.send(getFile)
  
  return response.Body?.transformToWebStream()
}



export { s3Client, uploadFile, getFileStream }