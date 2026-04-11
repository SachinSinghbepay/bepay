import mongoose, { Schema } from "mongoose";

const TopicSchema = new Schema(
  {
    name:  { type: String, required: true, trim: true, maxlength: 100 },
    slug:  { type: String, required: true, unique: true, trim: true, maxlength: 120 },
    color: { type: String, default: "#3B82F6", maxlength: 20 },
  },
  { timestamps: true }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
export default Topic;
