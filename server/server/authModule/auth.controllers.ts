import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import { apiResponse } from '../utils/apiReponse';
import { validate } from '../utils/validator';
import AuthService from './auth.service';
import { loginSchema } from './authDTOs/authVaidator';

export default class AuthController {
  private authService: AuthService;
  private event: APIGatewayProxyEvent;

  constructor(event: APIGatewayProxyEvent) {
    this.authService = new AuthService();
    this.event = event;
  }

  async register(): Promise<APIGatewayProxyResult> {
    const { email, password } = JSON.parse(this.event.body || '{}');

    return {
      statusCode: 200,
      body: JSON.stringify({
        email,
        password,
      }),
    };
  }

  async login(): Promise<APIGatewayProxyResult> {
    let body = JSON.parse(this.event.body || '{}');

    const valid = validate(loginSchema, body);

    if (!valid.valid) {
      const body = JSON.stringify({ body: valid.errors });
      return apiResponse(400, body);
    }

    console.log(process.env.ACCESS_TOKEN);

    // throw Error('bad request');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'login' }),
    };
  }
}
