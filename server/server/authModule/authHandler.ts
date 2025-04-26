import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { authRoute } from './auth.routes';

/**
 * lambda function for authentication
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await authRoute(event);
};
