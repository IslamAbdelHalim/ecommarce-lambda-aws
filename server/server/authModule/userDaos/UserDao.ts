import { RegisterUser, User } from '../models/user.model';

export interface UserDao {
  getUserById(id: string): Promise<User | undefined>;
  deleteUserById(id: string): Promise<void>;
}
