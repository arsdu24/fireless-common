import { TransformPipe } from '../../type';
import { Class } from 'utility-types';

export function createTransformPipe<D, R>(
  transform: (data: D) => R | Promise<R>,
): Class<TransformPipe<D, R>> {
  return class implements TransformPipe<D, R> {
    async transform(data: D): Promise<R> {
      return transform(data);
    }
  };
}
