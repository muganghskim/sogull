// pages/posts/page.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/posts/new">
        <a>Create a New Post</a>
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
