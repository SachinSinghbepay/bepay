import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title:      { type: String, required: true, trim: true, maxlength: 200 },
    slug:       { type: String, unique: true, trim: true, maxlength: 220 },
    content:    { type: Schema.Types.Mixed, required: true },
    excerpt:    { type: String, default: "", maxlength: 500 },
    coverImage: { type: String, default: "", maxlength: 2000 },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => v.length <= 20 && v.every((t) => t.length <= 50),
        message:   "tags: max 20 items, each up to 50 characters",
      },
    },
    categories: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => v.length <= 10 && v.every((c) => c.length <= 100),
        message:   "categories: max 10 items, each up to 100 characters",
      },
    },
    status:     { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    metaTitle:  { type: String, default: "", maxlength: 60 },
    metaDesc:   { type: String, default: "", maxlength: 160 },
  },
  { timestamps: true }
);

PostSchema.index({ status: 1, createdAt: -1 });
PostSchema.index({ categories: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ publishedAt: -1 });

PostSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  if (!this.slug) {
    this.slug = `post-${Date.now().toString(36)}`;
  }
});

PostSchema.pre("save", function () {
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
