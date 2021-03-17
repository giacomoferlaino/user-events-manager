import { HttpException } from './http-exception';
import { HttpResponseObject } from './types/http-response-object';

export class HttpResponse {
  constructor(private _data: any, private _error?: HttpException) {}

  public toJSON(): HttpResponseObject {
    const data: any = this._data ? this._data : [];
    const dataArray: any[] = Array.isArray(data) ? data : [data];
    return {
      data: dataArray,
      error: this._error,
    };
  }
}
