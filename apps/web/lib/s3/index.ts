import { S3Client } from "@aws-sdk/client-s3";

if (
  !process.env.S3_ACCESS_KEY ||
  !process.env.S3_SECRET_KEY ||
  !process.env.S3_REGION
) {
  throw new Error("Missing required S3 environment variables");
}

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  region: process.env.S3_REGION,
  forcePathStyle: process.env.S3_PATH_STYLE === "true",
  endpoint: process.env.S3_ENDPOINT,
  disableHostPrefix: true,
});

export * from ".";
