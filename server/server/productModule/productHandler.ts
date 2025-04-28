import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { productRoute } from './product.routes';

/**
 * lambda function for authentication
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await productRoute(event);
};
