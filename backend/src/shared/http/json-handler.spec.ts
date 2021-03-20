import {JsonHandler} from "./json-handler";
import {NextFunction} from "express";
import {HttpResponse} from "./http-response";

describe('JsonHandler', () => {
    let requestMock: any;
    let responseMock: any;
    let nextFunction: NextFunction;

    beforeEach(() => {
        requestMock = {};
        responseMock = {
            json: jest.fn(),
        };
        nextFunction = jest.fn();
    })

    describe('get', () => {
        it('should call next() if the middleware response is empty', async () => {
            const middlewareFunction = jest.fn().mockResolvedValue(undefined);
            const jsonHandler = new JsonHandler(middlewareFunction);
            await jsonHandler.get()(requestMock, responseMock, nextFunction);
            expect(nextFunction).toHaveBeenCalled();
        });

        it('should forward the error if an exception is thrown', async () => {
            const error = new Error('super important error');
            const middlewareFunction = jest.fn().mockRejectedValue(error);
            const jsonHandler = new JsonHandler(middlewareFunction);
            try {
            await jsonHandler.get()(requestMock, responseMock, nextFunction);
            } catch(_) {}
            expect(nextFunction).toHaveBeenCalledWith(error);
        });

        it('should send the response if not empty', async () => {
            const responseData = {key: 'value'};
            const httpResponse = new HttpResponse(responseData)
            const middlewareFunction = jest.fn().mockResolvedValue(responseData);
            const jsonHandler = new JsonHandler(middlewareFunction);
                await jsonHandler.get()(requestMock, responseMock, nextFunction);
            expect(responseMock.json).toHaveBeenCalledWith(httpResponse);
        });
    });
});