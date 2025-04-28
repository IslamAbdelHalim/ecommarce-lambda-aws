import { APIGatewayProxyEvent } from 'aws-lambda';
import { apiResponse } from '../../utils/apiReponse';
import { authProtect } from '../../utils/authProtect';
import UserServices from '../services/user.service';

export default class UserController {
  private userService;
  private event;

  constructor(event: APIGatewayProxyEvent) {
    this.userService = new UserServices();
    this.event = event;
  }

  async getUser() {
    const headers = this.event.headers;
    const { userId } = authProtect(headers);
    console.log(headers);

    if (!userId) {
      return apiResponse(401, JSON.stringify({ message: 'UnAuthorized' }));
    }

    const user = await this.userService.getUserById(userId);

    return apiResponse(200, JSON.stringify({ user }));
  }
}
