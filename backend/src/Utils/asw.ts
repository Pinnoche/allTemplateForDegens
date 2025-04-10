import { S3 } from 'aws-sdk';
import { configs } from '../configs';

export async function uploadImagesToS3(files: Array<Express.Multer.File>) {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        accessKeyId: configs.AWS_ACCESS_KEY_ID,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
        // region: configs.AWS_REGION,
        // endpoint: configs.AWS_ENDPOINT,
        // s3ForcePathStyle: true,
        // signatureVersion: 'v4',
      });

      const images = [];

      files.forEach(async (file) => {
        const fileName = file.originalname;

        const params = {
          Bucket: `${configs.AWS_BUCKET_NAME}/degen`,
          Key: fileName,
          Body: file.buffer,
        };

        const uploadResponse = await s3.upload(params).promise();

        images.push({
          Bucket: uploadResponse.Bucket,
          Key: uploadResponse.Key,
          Location: uploadResponse.Location,
        });

        if (images?.length === files.length) {
          resolve(images);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
