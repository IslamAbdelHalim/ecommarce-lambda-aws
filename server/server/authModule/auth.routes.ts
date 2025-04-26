import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AuthController from './auth.controllers';

// import catchError from '../utils/catchError';

export const authRoute = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authController = new AuthController(event);
  const route = event.path;
  try {
    if (route.endsWith('/register')) {
      return await authController.register();
    } else if (route.endsWith('/login')) {
      return await authController.login();
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Unknown endpoint api' }),
      };
    }
  } catch (error) {
    console.log(error);
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({ message: error }),
    };
    return response;
  }
};
