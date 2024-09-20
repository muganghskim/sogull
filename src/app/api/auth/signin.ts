// pages/api/auth/signin.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../lib/jwtUtills'; // 유틸리티 함수 경로
import User from '../../../models/User'; // 가상의 User 모델

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  try {
    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // JWT 토큰 생성
    const token = generateToken({ id: user._id, email: user.email });
    // 토큰 반환
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
