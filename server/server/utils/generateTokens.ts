import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export const generateAccessToken = async (userId: number | string, role: 'USER' | 'ADMIN') => {
  const payload = { userId, role };
  let secret, expiresIn;
  if (process.env.JWT_ACCESS_TOKEN && process.env.JWT_ACCESS_EXPIRESIN) {
    secret = process.env.JWT_ACCESS_TOKEN;
    expiresIn = process.env.JWT_ACCESS_EXPIRESIN;
    const token = jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
    return token;
  }
};

export const generateRefreshToken = async (userId: number | string) => {
  const payload = { userId };
  let secret, expiresIn;
  if (process.env.JWT_REFRESH_TOKEN && process.env.JWT_REFRESH_EXPIRESIN) {
    secret = process.env.JWT_REFRESH_TOKEN;

    expiresIn = parseInt(process.env.JWT_REFRESH_EXPIRESIN);
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  }
};
