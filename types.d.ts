import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

// 사용자 정의 타입 확장
declare module 'next' {
  interface NextApiRequest {
    user?: string | JwtPayload;  // JWT에서 디코딩된 사용자 정보 타입 (id, email 등)
  }
}
