import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { apiResponse } from '../../utils/apiReponse';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateTokens';
import { LoginUser, RegisterUser } from '../models/user.model';
import { IAuthDao } from '../userDaos/ImplementAuthDao';
import { IUserDao } from '../userDaos/implementUserDao';

dotenv.config();

export default class AuthService {
  private authDao;
  private userDao;
  constructor() {
    this.authDao = new IAuthDao();
    this.userDao = new IUserDao();
  }

  async createUser(user: RegisterUser) {
    console.log(user);
    try {
      user.email = user.email.toLowerCase();
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;

      const userId = await this.authDao.registerUser(user);
      console.log(userId);
      //create refresh token and save it in db
      const refreshToken = await generateRefreshToken(userId);
      // create access token
      const accessToken = await generateAccessToken(userId, 'USER');

      console.log(refreshToken, accessToken);

      // encrypt refresh token
      if (refreshToken) {
        const hashedToken = await bcrypt.hash(refreshToken, 12);
        // save refresh token in db
        await this.authDao.insertRefreshToken(hashedToken, userId);
      }

      // send refresh token in cookies in header
      const headers = {
        'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/refresh-token; Max-Age=604800`,
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Expose-Headers': 'Authorization',
      };
      const body = JSON.stringify({ accessToken });
      return apiResponse(201, body, headers);
    } catch (error) {
      console.log(error);
      const body = JSON.stringify({ message: 'server error' });
      return apiResponse(500, body);
    }
  }

  async loginUser(user: LoginUser) {
    const getUser = await this.authDao.loginUser(user.email);

    if (!getUser || !(await bcrypt.compare(user.password, getUser.password))) {
      const body = JSON.stringify({ message: 'Incorrect email or password' });
      return apiResponse(404, body);
    }

    const refreshToken = await generateRefreshToken(getUser.user_id);
    const accessToken = await generateAccessToken(getUser.user_id, getUser.role);

    if (refreshToken) {
      const hashedToken = await bcrypt.hash(refreshToken, 12);
      await this.authDao.insertRefreshToken(hashedToken, +getUser.user_id);
    }

    console.log(refreshToken, getUser.user_id);

    const { password, ...result } = getUser;

    const headers = {
      'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; false; Max-Age=604800`,
      Authorization: `Bearer ${accessToken}`,
      'Access-Control-Expose-Headers': 'Authorization',
    };
    const body = JSON.stringify({ accessToken, user: result });
    return apiResponse(201, body, headers);
  }

  async regenerateAccessToken(cookies: string) {
    const refreshToken = cookies.split('=')[1];

    if (!refreshToken) return apiResponse(400, JSON.stringify({ message: 'refresh token not found' }));

    let decode;
    if (process.env.JWT_REFRESH_TOKEN)
      decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN) as jwt.JwtPayload;

    const storedRefToken = await this.authDao.getRefreshToken(decode?.userId);
    const user = await this.userDao.getUserById(decode?.userId);

    if (user && storedRefToken && !(await bcrypt.compare(refreshToken, storedRefToken))) {
      const accessToken = await generateAccessToken(user.user_id, user.role);
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Expose-Headers': 'Authorization',
      };
      const body = JSON.stringify({ accessToken });
      return apiResponse(201, body, headers);
    }

    return apiResponse(400, JSON.stringify({ message: 'Invalid refresh token' }));
  }
}
