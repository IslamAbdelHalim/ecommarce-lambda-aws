import { APIGatewayProxyResult } from 'aws-lambda';

export const apiResponse = (statusCode: number, body: string, headers?: any): APIGatewayProxyResult => {
  const response = {
    statusCode,
    body,
    headers,
  };

  return response;
};
