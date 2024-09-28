// app/posts/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [showPreview, setShowPreview] = useState(false); // 미리보기 상태
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', { title, content, author });
      router.push('/posts');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content (Markdown supported):</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      <button onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </button>

      {showPreview && (
        <div>
          <h2>Preview:</h2>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default NewPostPage;
