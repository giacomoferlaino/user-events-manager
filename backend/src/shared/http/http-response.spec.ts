import { HttpResponse } from './http-response';

describe('HttpResponse', () => {
  let httpResponse: HttpResponse;

  describe('toJSON', () => {
    it('should return an empty array if not data is provided', () => {
      httpResponse = new HttpResponse(undefined);
      expect(httpResponse.toJSON().data).toStrictEqual([]);
    });

    it('should wrap the data inside an array if needed', () => {
      const dataMock: any = { user: 'username' };
      const expectedData = [dataMock];
      httpResponse = new HttpResponse(dataMock);
      expect(httpResponse.toJSON().data).toStrictEqual(expectedData);
    });
  });
});
