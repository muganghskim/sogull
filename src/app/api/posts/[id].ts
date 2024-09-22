// pages/api/posts/[id].ts (게시글 수정 및 삭제 처리)
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../models/Post';
import connectToDatabase from '../../../lib/mongodb'; // MongoDB 연결 유틸리티

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;
  
  if (req.method === 'GET') {
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch post', error });
    }
  }
  else if (req.method === 'PUT') {
    const { title, content, author } = req.body;
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, author },
        { new: true } // 수정 후 업데이트된 데이터를 반환
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update post', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete post', error });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
