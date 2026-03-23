import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET   = process.env.AWS_S3_BUCKET_NAME;
const CDN_BASE = process.env.AWS_CDN_BASE_URL; // https://assets.bepay.money

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file     = formData.get("file");
    // optional: "cover" | "inline" — controls folder & resize dimensions
    const type     = formData.get("type") || "cover";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const raw    = await file.arrayBuffer();
    const buffer = Buffer.from(raw);

    // ── Sharp optimisation ───────────────────────────────────────────────────
    // Cover images  → max 1200 px wide, WebP q80
    // Inline images → max 900 px wide,  WebP q75
    const maxWidth = type === "cover" ? 1200 : 900;
    const quality  = type === "cover" ? 80    : 75;

    const optimised = await sharp(buffer)
      .resize({ width: maxWidth, withoutEnlargement: true }) // never upscale
      .webp({ quality })
      .toBuffer();

    // ── Upload to S3 ─────────────────────────────────────────────────────────
    const folder = type === "cover" ? "blog_cms/covers" : "blog_cms/inline";
    const key    = `${folder}/${uuidv4()}.webp`;

    await s3.send(
      new PutObjectCommand({
        Bucket:      BUCKET,
        Key:         key,
        Body:        optimised,
        ContentType: "image/webp",
      })
    );

    // Return CDN URL (not raw S3 URL)
    const url = `${CDN_BASE}/${key}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed: " + error.message },
      { status: 500 }
    );
  }
}
