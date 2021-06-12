import { Request, Response } from 'express';
export interface NBERequest extends Request {
  key?: string;
}
export interface NBEResponse extends Response {
  key?: string;
}
export enum HttpMethod {
  POST,
  GET,
}
export const nbeSend = (statusCode: number, sendObj: any, response: NBEResponse) =>
  response.status(statusCode).send(sendObj);
