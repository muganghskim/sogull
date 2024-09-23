// pages/api/comments/[id].ts (댓글 수정 및 삭제 API)
import { NextApiRequest, NextApiResponse } from 'next';
import Comment from '../../../models/Comment';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { content } = req.body;

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true } // 수정된 댓글 반환
      );
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update comment', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete comment', error });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
