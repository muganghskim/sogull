// pages/api/comments/comment.ts (댓글 작성 API)
import { NextApiRequest, NextApiResponse } from 'next';
import Comment from '../../../models/Comment';
import connectToDatabase from '../../../lib/mongodb'; // MongoDB 연결 유틸리티

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { postId, author, content } = req.body;

    try {
      const newComment = new Comment({ postId, author, content });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create comment', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
