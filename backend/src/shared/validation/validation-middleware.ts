import { MiddlewareHandler } from '../http/types/middleware-handler';
import { RequestContext } from '../http/interfaces/request-context';
import { DataTransferObject } from './data-transfer-object';
import { validateOrReject, ValidatorOptions } from 'class-validator';
import { ValidationException } from './validation-exception';

export class ValidationMiddleware {
  private static OPTIONS: ValidatorOptions = {
    whitelist: true,
    forbidUnknownValues: true,
  };

  public static validateBody(
    target: DataTransferObject,
  ): MiddlewareHandler<void> {
    return async (context: RequestContext) => {
      target.populateFromObject(context.req.body);
      try {
        await validateOrReject(target, ValidationMiddleware.OPTIONS);
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
