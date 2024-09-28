// app/posts/[id]/page.tsx (상세 페이지에 삭제 기능 추가)
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Next.js 13의 useParams
import axios from 'axios';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import ReactMarkdown from 'react-markdown'; // react-markdown 임포트

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
}

const PostDetailPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  // id가 string | string[] 타입일 수 있으므로 string으로 처리
  const postId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      router.push('/posts'); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post?.title}</h1>
      {/* Markdown 렌더링 */}
      <ReactMarkdown>{post?.content || ''}</ReactMarkdown>
      <p>Author: {post?.author}</p>
      <button onClick={handleDelete}>Delete Post</button>
      {/* 댓글 작성 폼 */}
      <CommentForm postId={postId} onCommentAdded={() => {/* 필요 시 댓글 목록 갱신 */}} />

      {/* 댓글 목록 */}
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetailPage;
