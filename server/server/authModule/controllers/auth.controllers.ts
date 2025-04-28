import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from '../../utils/apiReponse';
import { validate } from '../../utils/validator';
import { loginSchema, registerSchema } from '../authVaidator';
import AuthService from '../services/auth.service';

import * as crypto from 'crypto';
import generatePreSignedUrl from '../../utils/generatePresignUrl';

export default class AuthController {
  private authService: AuthService;
  private event: APIGatewayProxyEvent;

  constructor(event: APIGatewayProxyEvent) {
    this.authService = new AuthService();
    this.event = event;
  }

  async register(): Promise<APIGatewayProxyResult> {
    const body = JSON.parse(this.event.body || '{}');
    const valid = validate(registerSchema, body);

    if (!valid.valid) {
      const body = JSON.stringify({ body: valid.errors });
      return apiResponse(400, body);
    }

    return await this.authService.createUser(body);
  }

  async login(): Promise<APIGatewayProxyResult> {
    const body = JSON.parse(this.event.body || '{}');

    const valid = validate(loginSchema, body);

    if (!valid.valid) {
      const body = JSON.stringify({ body: valid.errors });
      return apiResponse(400, body);
    }

    return await this.authService.loginUser(body);
  }

  async refreshToken(): Promise<APIGatewayProxyResult> {
    const cookies = this.event.headers?.Cookie || this.event.headers?.Cookies;

    console.log(cookies);
    console.log(this.event.headers);

    if (!cookies) {
      return apiResponse(400, JSON.stringify({ message: 'refresh token not found' }));
    }

    return await this.authService.regenerateAccessToken(cookies);
  }

  async getPreSignedUrl() {
    const fileName = this.event.queryStringParameters?.fileName;
    const fileType = this.event.queryStringParameters?.fileType;

    if (!fileName || !fileType) {
      return apiResponse(400, JSON.stringify({ message: 'please provide file name and file type' }));
    }

    const ext = fileType.split('/')[1] || 'png';
    const fileExt = fileName.split('.')[0];
    const randomPart = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const generatedFileName = `profile-picture-${randomPart}-${timestamp}.${ext}`;

    const { signedUrl, fileUrl } = await generatePreSignedUrl(generatedFileName, fileExt);

    return apiResponse(200, JSON.stringify({ signedUrl, fileUrl }));
  }
}
