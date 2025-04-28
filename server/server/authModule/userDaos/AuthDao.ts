import { RegisterUser, User } from '../models/user.model';

export interface AuthDao {
  registerUser(user: RegisterUser): Promise<number>;
  loginUser(email: string): Promise<User>;
  insertRefreshToken(refreshToken: string, userId: number): Promise<void>;
  getRefreshToken(userId: number): Promise<string | null>;
}
