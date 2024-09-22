// pages/api/posts/post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../models/Post';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch posts', error });
    }
  } else if (req.method === 'POST') {
    const { title, content, author } = req.body;

    try {
      const newPost = new Post({ title, content, author });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create post', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
