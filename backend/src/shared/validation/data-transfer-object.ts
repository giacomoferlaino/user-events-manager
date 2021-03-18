export interface DataTransferObject<T extends object> {
  fromObject(source: any): T;
}
