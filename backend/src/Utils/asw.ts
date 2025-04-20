import { S3 } from 'aws-sdk';
import { configs } from '../configs';

export async function uploadImagesToS3(files: Array<Express.Multer.File>) {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        accessKeyId: configs.AWS_ACCESS_KEY_ID,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      });

      const images = [];

      files.forEach(async (file) => {
        const fileName = `degen/${file.originalname}`;

        const params = {
          Bucket: `${configs.AWS_BUCKET_NAME}`,
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

export async function deleteImagesFromS3(files: Array<Express.Multer.File>) {
  try {
    const s3 = new S3({
      accessKeyId: configs.AWS_ACCESS_KEY_ID,
      secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
    });
    const deleteParams = {
      Bucket: configs.AWS_BUCKET_NAME,
      Delete: {
        Objects: files.map((image) => ({
          Key: `degen/${image.filename}`,
        })),
        Quiet: false,
      },
    };
    const deleteResponse = await s3.deleteObjects(deleteParams).promise();

    return deleteResponse;
  } catch (error) {
    throw new Error(`Error deleting images: ${error}`);
  }
}
