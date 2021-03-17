import { HttpException } from '../http-exception';

export type HttpResponseObject = {
  data: any;
  error: HttpException | undefined;
};
