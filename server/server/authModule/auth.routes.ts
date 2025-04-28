import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from '../utils/apiReponse';
import AuthController from './controllers/auth.controllers';
import UserController from './controllers/user.contrllers';

// import catchError from '../utils/catchError';

export const authRoute = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authController = new AuthController(event);
  const userController = new UserController(event);
  const route = event.path;

  try {
    if (route.endsWith('/register')) {
      return await authController.register();
    } else if (route.endsWith('/login')) {
      return await authController.login();
    } else if (route.endsWith('/refresh-token')) {
      return await authController.refreshToken();
    } else if (route.endsWith('/get-presigned-url')) {
      return await authController.getPreSignedUrl();
    } else if (route.endsWith('/profile')) {
      return await userController.getUser();
    } else {
      return apiResponse(404, JSON.stringify({ message: 'Unknown endpoint api' }));
    }
  } catch (error) {
    console.log(error);
    return apiResponse(500, JSON.stringify({ message: error }));
  }
};
