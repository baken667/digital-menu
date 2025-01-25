import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { messages } from "@/lib/messages";
import { GetObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { BUCKET } from "@/lib/consts";

const DEFAULT_TTL = 60 * 60 * 24 * 7;

export const GET = async (
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> },
) => {
  try {
    const { path: pathParts } = await props.params;
    const searchParams = request.nextUrl.searchParams;
    const heightParam = searchParams.get("height");
    const fileName = pathParts.at(-1);

    if (!fileName) {
      return NextResponse.json(
        {
          message: messages.validation.invalidImageType,
        },
        {
          status: 400,
        },
      );
    }

    if (heightParam === null) {
      const { Body: imageStream, ContentType } = await storage.send(
        new GetObjectCommand({
          Bucket: BUCKET,
          Key: pathParts.join("/"),
        }),
      );

      const stream = imageStream?.transformToWebStream();

      return new NextResponse(stream, {
        headers: {
          ...(ContentType && {
            "Content-Type": ContentType,
          }),
          "Cache-Control": `public, max-age=${DEFAULT_TTL}`,
        },
      });
    }

    const fileDir = pathParts.slice(0, -1).join("/");

    const { Body: imageStream, ContentType } = await storage.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: `${fileDir}/${heightParam}_${fileName}`,
      }),
    );

    const stream = imageStream?.transformToWebStream();

    return new NextResponse(stream, {
      headers: {
        ...(ContentType && {
          "Content-Type": ContentType,
        }),
        "Cache-Control": `public, max-age=${DEFAULT_TTL}`,
      },
    });
  } catch (error) {
    if (error instanceof S3ServiceException) {
      if (error.name === "NoSuchKey") {
        return NextResponse.json(
          {
            messages: messages.errors.common.notFound,
          },
          { status: 404 },
        );
      }
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
