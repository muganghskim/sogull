// models/Comment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  postId: mongoose.Schema.Types.ObjectId;
  author: string;
  content: string;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // 게시글 ID
  author: { type: String, required: true }, // 작성자
  content: { type: String, required: true }, // 댓글 내용
  createdAt: { type: Date, default: Date.now }, // 작성 시간
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
