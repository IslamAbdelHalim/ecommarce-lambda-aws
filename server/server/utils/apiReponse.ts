import { APIGatewayProxyResult } from 'aws-lambda';

export const apiResponse = (statusCode: number, body: string, headers?: any): APIGatewayProxyResult => {
  const response = {
    statusCode,
    body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      ...headers,
    },
  };

  return response;
};
