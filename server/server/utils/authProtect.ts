import { APIGatewayProxyEventHeaders } from 'aws-lambda';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export const authProtect = (headers: APIGatewayProxyEventHeaders) => {
  let token;
  if (headers.Authorization && headers.Authorization.startsWith('Bearer')) {
    token = headers.Authorization.split(' ')[1];
  }

  console.log(token);
  console.log('signetrue', process.env.JWT_ACCESS_TOKEN);

  let decode;
  if (token && process.env.JWT_ACCESS_TOKEN) decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN) as jwt.JwtPayload;

  return { userId: decode?.userId, role: decode?.role };
};
