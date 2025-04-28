import { ResultSetHeader } from 'mysql2/promise';
import pool from '../../config/db';
import { RegisterUser, User } from '../models/user.model';
import { AuthDao } from './AuthDao';

export class IAuthDao implements AuthDao {
  async registerUser(user: RegisterUser): Promise<number> {
    const [result] = await pool.query('INSERT INTO `users`(name, email, password, profile_pic) VALUES (?, ?, ?, ?)', [
      user.name,
      user.email,
      user.password,
      user.image_url,
    ]);

    const insertResult = result as ResultSetHeader;
    return insertResult.insertId;
  }

  async loginUser(email: string): Promise<User> {
    const [rows] = await pool.query(
      'SELECT user_id, name, password, profile_pic, role FROM users WHERE email=? AND is_deleted=false',
      [email],
    );

    return (rows as User[])[0];
  }

  async insertRefreshToken(refreshToken: string, userId: number): Promise<void> {
    await pool.query('INSERT INTO refresh_token (user_id, token) VALUES (?, ?)', [userId, refreshToken]);
  }

  async getRefreshToken(userId: number): Promise<string | null> {
    const [rows] = await pool.query('SELECT token FROM refresh_token WHERE user_id=?', [userId]);

    // const result = rows as { token: string }[];

    const result = rows as { token: string }[];
    return result.length > 0 ? result[0].token : null;
  }
}
