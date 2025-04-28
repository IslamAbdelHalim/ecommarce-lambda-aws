import { IUserDao } from '../userDaos/implementUserDao';

export default class UserServices {
  private userDao;

  constructor() {
    this.userDao = new IUserDao();
  }

  async getUserById(id: string) {
    const user = await this.userDao.getUserById(id);
    return user;
  }
}
