// components/CommentForm.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void; // 댓글 추가 후 목록 갱신 함수
}

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/comments', { postId, author, content });
      setAuthor('');
      setContent('');
      onCommentAdded(); // 댓글 추가 후 목록 갱신
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
