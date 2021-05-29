import { Request, Response } from 'express';
export interface NBERequest extends Request {};
export interface NBEResponse extends Response {};
export enum HttpMethod { POST, GET };
export const nbeSend = (statusCode: number, sendObj: any, response: NBEResponse) => response.status(statusCode).send(sendObj)