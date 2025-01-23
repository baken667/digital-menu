import sharp from "sharp";

export async function toWebp(fileBuffer: Buffer): Promise<Buffer> {
  return await sharp(fileBuffer).webp({ quality: 85 }).toBuffer();
}

export async function resizeImage(fileBuffer: Buffer, height: number): Promise<Buffer> {
  return await sharp(fileBuffer).resize({height}).webp({ quality: 85 }).toBuffer();
}