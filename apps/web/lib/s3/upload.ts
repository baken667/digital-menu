import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { s3Client } from ".";
import { BUCKET, MAX_FILE_SIZE } from "../consts";

export async function createS3PresignedPostUrl(
  bucketName: string,
  contentType: string,
  maxSize: number = MAX_FILE_SIZE,
) {
  try {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: BUCKET,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, maxSize], // Условия для размера файла
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600,
    });

    return { url, fields };
  } catch (error) {
    console.error("Error creating presigned post URL:", error);
    throw new Error("Failed to create presigned post URL");
  }
}
