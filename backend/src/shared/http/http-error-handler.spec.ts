import { HttpErrorHandler } from './http-error-handler';
import { HttpException } from './http-exception';
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express';
import { HttpResponse } from './http-response';
import { HttpServerException } from './http-server-exception';

describe('HttpErrorHandler', () => {
  let errorHandler = new HttpErrorHandler();
  let requestMock: any;
  let responseMock: any;
  let nextFunctionMock: NextFunction;

  beforeEach(() => {
    responseMock = {
      status: jest.fn(),
      json: jest.fn(),
    };
    requestMock = {};
    nextFunctionMock = jest.fn();
  });

  describe('get', () => {
    it('should send the custom exception if is an instance of HttpException', () => {
      expect.assertions(2);
      const httpException = new HttpException('customMessage', StatusCodes.OK);
      errorHandler.get()(
        httpException,
        requestMock,
        responseMock,
        nextFunctionMock,
      );
      const expectedResponse = new HttpResponse(undefined, httpException);
      expect(responseMock.status).toHaveBeenCalledWith(
        httpException.statusCode,
      );
      expect(responseMock.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('should return a generic exception if is not instance of HttpException', () => {
      spyOn(console, 'error'); // keeping the output console clean
      expect.assertions(2);
      const notHttpException = new Error('generic error');
      errorHandler.get()(
        notHttpException,
        requestMock,
        responseMock,
        nextFunctionMock,
      );
      const expectedResponse = new HttpResponse(
        undefined,
        new HttpServerException(),
      );
      expect(responseMock.status).toHaveBeenCalledWith(
        HttpServerException.statusCode,
      );
      expect(responseMock.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
