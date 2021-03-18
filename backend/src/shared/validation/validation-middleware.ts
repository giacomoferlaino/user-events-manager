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

  public static validateBody<T extends object>(
    target: DataTransferObject<T>,
  ): MiddlewareHandler<void> {
    return async (context: RequestContext) => {
      const dto = target.fromObject(context.req.body);
      try {
        await validateOrReject(dto, ValidationMiddleware.OPTIONS);
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
