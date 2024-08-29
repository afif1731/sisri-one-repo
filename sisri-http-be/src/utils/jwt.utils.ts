import jwt from 'jsonwebtoken';

import { JWT } from '../config/jwt.config';
import { type JwtPayload } from '../model';

export const generateAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT.JWT_SECRET);

export function tokenDecode(token: string) {
  return jwt.verify(token, JWT.JWT_SECRET) as JwtPayload;
}
