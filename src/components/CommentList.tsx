// components/CommentList.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentListProps {
  postId: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?postId=${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleDelete = async (commentId: string) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p><strong>{comment.author}</strong>: {comment.content}</p>
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
