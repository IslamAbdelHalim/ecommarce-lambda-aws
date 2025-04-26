import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

type handler = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export default async function (handler: handler) {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event);
    } catch (error: any) {
      console.log(error);

      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ message: error.message || 'Internal server error' }),
      };
    }
  };
}
