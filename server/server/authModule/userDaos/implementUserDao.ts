import pool from '../../config/db';

import { User } from '../models/user.model';
import { UserDao } from './UserDao';

export class IUserDao implements UserDao {
  async getUserById(id: string): Promise<User | undefined> {
    const [rows] = await pool.query(
      `SELECT user_id, name, email, profile_pic, role FROM users WHERE user_id=? AND is_deleted=false`,
      [id],
    );

    return (rows as User[])[0];
  }
  deleteUserById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
