import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

interface DecodedToken {
  id: string;
  email: string;
}

export const generateToken = (user: UserPayload): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
};


export const verifyToken = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    req.user = decoded; // TypeScript에서 req.user 타입을 지정해야 함
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};