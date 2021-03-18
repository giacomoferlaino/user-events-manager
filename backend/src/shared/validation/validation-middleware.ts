import { MiddlewareHandler } from '../http/types/middleware-handler';
import { RequestContext } from '../http/interfaces/request-context';
import { DataTransferObject } from './data-transfer-object';
import { validateOrReject, ValidatorOptions } from 'class-validator';
import { ValidationException } from './validation-exception';
import { plainToClass } from 'class-transformer';

export class ValidationMiddleware {
  private static OPTIONS: ValidatorOptions = {
    whitelist: true,
    forbidUnknownValues: true,
  };

  public static validateBody(
    targetType: typeof DataTransferObject,
  ): MiddlewareHandler<void> {
    return async (context: RequestContext) => {
      const requestObject = plainToClass(targetType, context.req.body);
      try {
        await validateOrReject(requestObject, ValidationMiddleware.OPTIONS);
        context.req.body = requestObject;
      } catch (errors) {
        let errorMessage = '';
        for (const err of errors) {
          errorMessage += err.toString();
        }
        throw new ValidationException(errorMessage);
      }
    };
  }
}
