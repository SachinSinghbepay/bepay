import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    content: { type: Schema.Types.Mixed, required: true }, // Tiptap JSON
    excerpt: { type: String, default: "" },
    coverImage: { type: String },
    tags: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }, // auto adds createdAt & updatedAt
);

// Auto-generate slug from title if not provided
PostSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

// Set publishedAt when status changes to published
PostSchema.pre("save", function () {
  if (
    this.isModified("status") &&
    this.status === "published" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }
});

// To this:
delete mongoose.models.Post;
const Post = mongoose.model("Post", PostSchema);
export default Post;
