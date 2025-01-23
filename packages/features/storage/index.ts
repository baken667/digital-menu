import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import sharp from "sharp";

class storage {
  private s3: S3Client;
  private bucket: string;

  constructor(config: S3ClientConfig, bucket: string) {
    this.bucket = bucket;
    this.s3 = new S3Client(config);
  }

  async upload(fileBuffer: Buffer, collection: string, thumbs?: number[]) {
    try {
      const fileName = uuid();
      const ext = "webp";
      const key = `${collection}/${fileName}.${ext}`;

      const img = await this.toWebp(fileBuffer);

      const command = new PutObjectCommand({
        Body: img,
        Bucket: this.bucket,
        Key: key,
        ContentType: "image/webp",
      });

      await this.s3.send(command);

      return {
        success: true,
        key: key,
      };
    } catch (err) {
      throw err;
    }
  }

  async toWebp(fileBuffer: Buffer): Promise<Buffer> {
    return await sharp(fileBuffer).webp({ quality: 85 }).toBuffer();
  }
}

export default storage;
