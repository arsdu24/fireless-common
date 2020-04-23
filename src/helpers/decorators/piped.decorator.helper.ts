import { Class } from 'utility-types';
import {
  KlassMethodParamDecorator,
  PipedDecorator,
  PipedHandlerParamDecorator,
  PipedHandlerParamDecoratorCreator,
  TransformPipe,
} from '../../type';

export function createPipedHandlerParamDecorator<T extends {}>(
  resolver: PipedHandlerParamDecoratorCreator<T>,
): PipedHandlerParamDecorator<T> {
  return new Proxy(new Function(), {
    apply(
      target: Function,
      thisArg: any,
      pipes?: Class<TransformPipe<any, any>>[],
    ): KlassMethodParamDecorator {
      return resolver({ pipes: pipes || [] });
    },
    get<K extends keyof T>(target: Function, key: K): PipedDecorator<T[K]> {
      return (...pipes: Class<TransformPipe<any, any>>[]) =>
        resolver({
          pipes,
          key,
        });
    },
  }) as PipedHandlerParamDecorator<T>;
}
