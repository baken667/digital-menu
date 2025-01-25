import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { BUCKET } from "../consts";
import { resizeImage, toWebp } from "./utils";
import { messages } from "../messages";

if (
  !process.env.S3_ACCESS_KEY ||
  !process.env.S3_SECRET_KEY ||
  !process.env.S3_REGION
) {
  throw new Error("Missing required S3 environment variables");
}

export const storage = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  region: process.env.S3_REGION,
  forcePathStyle: process.env.S3_PATH_STYLE === "true",
  endpoint: process.env.S3_ENDPOINT,
  disableHostPrefix: true,
});

export async function uploadImage(
  fileBuffer: Buffer,
  collection: string,
  thumbs?: number[],
) {
  try {
    const fileName = uuid();
    const ext = "webp";
    const prefix = `${collection}/${fileName}`;
    const key = `${prefix}/${fileName}.${ext}`;

    const webpImage = await toWebp(fileBuffer);

    await storage.send(
      new PutObjectCommand({
        Body: webpImage,
        Bucket: BUCKET,
        Key: key,
        ContentType: "image/webp",
      }),
    );

    if (thumbs && thumbs.length > 0) {
      const thumbnailsPromises = thumbs.map(async (size) => {
        const thumbKey = `${prefix}/${size}_${fileName}.${ext}`;
        const thumbBuffer = await resizeImage(webpImage, size);

        await storage.send(
          new PutObjectCommand({
            Body: thumbBuffer,
            Bucket: BUCKET,
            Key: thumbKey,
            ContentType: "image/webp",
          }),
        );

        return size;
      });

      await Promise.all(thumbnailsPromises);
    }

    return {
      path: key,
    };
  } catch (err) {
    throw err;
  }
}

export async function removeImage(path: string) {
  try {
    const pathParts = path.split("/");
    const fileDir = pathParts.slice(0, -1).join("/");

    const list = await storage.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: fileDir,
      }),
    );

    if (list.Contents?.length === 0) {
      throw new Error(messages.errors.common.notFound);
    }

    await storage.send(
      new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: {
          Objects: list.Contents?.filter((obj) => obj.Key).map((obj) => ({
            Key: obj.Key,
          })),
          Quiet: true,
        },
      }),
    );

    return {
      success: true,
    };
  } catch (err) {
    throw err;
  }
}
