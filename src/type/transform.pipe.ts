export interface TransformPipe<D, R> {
  transform(data: D): Promise<R>;
}
