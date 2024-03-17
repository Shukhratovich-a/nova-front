export interface IGetAll<T> {
  map(arg0: (video: any) => string): ConcatArray<string>;
  data: T;
  total: number;
}
