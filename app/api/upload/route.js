import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { requireAdmin } from "@/lib/cms-auth";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET   = process.env.AWS_S3_BUCKET_NAME;
const CDN_BASE = (process.env.AWS_CDN_BASE_URL || "").replace(/\/$/, "");

const MAX_FILE_SIZE  = 10 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const TYPE_CONFIG    = {
  cover:  { maxWidth: 1200, quality: 80, folder: "blog_cms/covers" },
  inline: { maxWidth: 900,  quality: 75, folder: "blog_cms/inline" },
};

export async function POST(request) {
  try {
    const { authError } = await requireAdmin(request);
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type") || "cover";

    if (!file) return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    if (!TYPE_CONFIG[type]) return NextResponse.json({ success: false, error: 'Invalid type. Must be "cover" or "inline".' }, { status: 400 });
    if (!ACCEPTED_TYPES.has(file.type)) return NextResponse.json({ success: false, error: "Unsupported file type." }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ success: false, error: "File too large. Max 10 MB." }, { status: 400 });

    const { maxWidth, quality, folder } = TYPE_CONFIG[type];
    const key = `${folder}/${uuidv4()}.webp`;

    const raw    = await file.arrayBuffer();
    const buffer = Buffer.from(raw);

    const optimised = await sharp(buffer)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    await s3.send(new PutObjectCommand({
      Bucket:       BUCKET,
      Key:          key,
      Body:         optimised,
      ContentType:  "image/webp",
      CacheControl: "public, max-age=31536000, immutable",
    }));

    return NextResponse.json({ success: true, url: `${CDN_BASE}/${key}` });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Upload failed: " + error.message }, { status: 500 });
  }
}
