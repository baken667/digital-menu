import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { BUCKET } from "../consts";
import { resizeImage, toWebp } from "./utils";

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

export async function upload(
  fileBuffer: Buffer,
  collection: string,
  thumbs?: number[]
) {
  try {
    const fileName = uuid();
    const ext = "webp";
    const key = `${collection}/${fileName}/${fileName}.${ext}`;

    const img = await toWebp(fileBuffer);

    const uploadPromises = [
      storage.send(
        new PutObjectCommand({
          Body: img,
          Bucket: BUCKET,
          Key: key,
          ContentType: "image/webp",
        })
      ),
    ];

    if (thumbs && thumbs.length > 0) {
      for (const height of thumbs) {
        const resizedImg = await resizeImage(fileBuffer, height);
        const thumbKey = `${collection}/${fileName}/${fileName}_${height}.${ext}`;

        uploadPromises.push(
          storage.send(
            new PutObjectCommand({
              Body: resizedImg,
              Bucket: BUCKET,
              Key: thumbKey,
              ContentType: "image/webp",
            })
          )
        );
      }
    }

    await Promise.all(uploadPromises);

    return {
      success: true,
      key: key,
    };
  } catch (err) {
    throw err;
  }
}

export async function get(path: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: path,
    });

    return await storage.send(command);
  } catch (err) {
    return null;
  }
}

export async function remove(path: string) {
  try {
    const [collection, fileName] = path.split("/").slice(0, 2);
    const baseName = fileName.split(".")[0];
    const basePath = `${collection}/${fileName.split(".")[0]}/`;

    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: basePath,
    });

    const listedObjects = await storage.send(listCommand);

    console.log(`aboba aboba`, listedObjects);

    const keysToDelete = listedObjects.Contents?.filter((item) =>
      item.Key?.startsWith(`${basePath}${baseName}`)
    ).map((item) => ({ Key: item.Key }));

    if (!keysToDelete || keysToDelete.length === 0) {
      return {
        success: false,
        message: "No matching files found for deletion",
      };
    }

    const deleteCommand = new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: keysToDelete,
      },
    });

    await storage.send(deleteCommand);

    return {
      success: true,
      deletedKeys: keysToDelete.map((k) => k.Key),
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to delete files",
      err,
    };
  }
}
