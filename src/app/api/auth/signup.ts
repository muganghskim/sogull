import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // JWT 토큰 발급 (유틸리티 함수 사용)
    // const token = generateToken({ id: newUser._id, email: newUser.email });

    return res.status(201).json({ });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
