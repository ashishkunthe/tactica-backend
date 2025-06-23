import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost {
  day: number;
  idea: string;
  caption: string;
  hashtags: string[];
}

export interface IContentPlan extends Document {
  user: Types.ObjectId;
  brandName: string;
  tone: string;
  platform: string;
  targetAudience: string;
  posts: IPost[];
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  day: Number,
  idea: String,
  caption: String,
  hashtags: [String],
});

const ContentPlanSchema = new Schema<IContentPlan>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  brandName: { type: String, required: true },
  tone: { type: String, required: true },
  platform: { type: String, required: true },
  targetAudience: { type: String, required: true },
  posts: [PostSchema],
  createdAt: { type: Date, default: Date.now },
});

const ContentPlan = mongoose.model<IContentPlan>(
  "ContentPlan",
  ContentPlanSchema
);

export default ContentPlan;
