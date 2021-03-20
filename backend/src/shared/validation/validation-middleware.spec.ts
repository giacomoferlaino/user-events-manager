import { ValidationMiddleware } from './validation-middleware';
import { DataTransferObject } from './data-transfer-object';
import { ValidationException } from './validation-exception';
import { RequestContext } from '../http/interfaces/request-context';
import * as ClassValidator from 'class-validator';
import * as ClassTransformer from 'class-transformer';

describe('ValidationMiddleware', () => {
  let context: RequestContext;

  beforeEach(() => {
    context = {
      req: {} as any,
      res: {} as any,
      next: jest.fn(),
    };
  });

  describe('validateBody', () => {
    it('should throw an exception if validation fails', async () => {
      jest.spyOn(ClassTransformer, 'plainToClass').mockReturnValue({});
      jest
        .spyOn(ClassValidator, 'validateOrReject')
        .mockRejectedValue([new Error()]);
      const validationMiddleware = ValidationMiddleware.validateBody(
        DataTransferObject,
      );
      await expect(() => validationMiddleware(context)).rejects.toThrow(
        ValidationException,
      );
    });

    it('should save the validated object into the request body', async () => {
      const requestObject = { key: 'value' };
      jest
        .spyOn(ClassTransformer, 'plainToClass')
        .mockReturnValue(requestObject);
      jest.spyOn(ClassValidator, 'validateOrReject').mockResolvedValue();
      await ValidationMiddleware.validateBody(DataTransferObject)(context);
      expect(context.req.body).toStrictEqual(requestObject);
    });
  });
});
