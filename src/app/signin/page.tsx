// pages/signin.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      // JWT 토큰 저장 (localStorage를 사용)
      const token = response.data.token;
      localStorage.setItem('token', token);

      // 로그인 성공 후 리다이렉션
      router.push('/'); // 홈 페이지로 이동
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
