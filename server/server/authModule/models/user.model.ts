export type User = {
  user_id: number | string;
  name: string;
  email: string;
  password: string;
  image_url: string;
  role: 'USER' | 'ADMIN';
  is_delete: boolean;
};

export type RegisterUser = Pick<User, 'name' | 'email' | 'password' | 'image_url'>;

export type LoginUser = Pick<User, 'email' | 'password'>;
