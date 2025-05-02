import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({});

async function generatePreSignedUrl(fileName: string, filExt: string): Promise<{ signedUrl: string; fileUrl: string }> {
  const bucketName = process.env.BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: fileName,
    ContentType: `image/${filExt}`,
  };

  try {
    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 360 });
    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    return { signedUrl, fileUrl };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Could not generate presigned URL');
  }
}

export default generatePreSignedUrl;
