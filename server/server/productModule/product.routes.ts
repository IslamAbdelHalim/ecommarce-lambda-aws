import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from '../utils/apiReponse';

export const productRoute = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const route = event.path;

  try {
    if (route.endsWith('/register')) {
      return apiResponse(404, JSON.stringify({ message: 'Unknown endpoint api' }));
    } else {
      return apiResponse(404, JSON.stringify({ message: 'Unknown endpoint api' }));
    }
  } catch (error) {
    console.log(error);

    return apiResponse(500, JSON.stringify({ message: error }));
  }
};
