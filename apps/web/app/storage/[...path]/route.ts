import { get } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { path } = await props.params;
    const height = searchParams.get("height");

    let pathStr = path.join("/");
    if (height) {
      const extIndex = pathStr.lastIndexOf(".");
      if (extIndex === -1) {
        return NextResponse.json(
          { error: "Invalid file path, extension missing" },
          { status: 400 }
        );
      }

      pathStr =
        pathStr.slice(0, extIndex) + `_${height}` + pathStr.slice(extIndex);
    }

    const file = await get(pathStr);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return new NextResponse(file.Body as ReadableStream, {
      headers: {
        "Content-Type": file.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
