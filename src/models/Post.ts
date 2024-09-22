// models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }, // 작성자 정보 (예: 사용자 ID)
  createdAt: { type: Date, default: Date.now }, // 자동으로 생성일을 추가
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
