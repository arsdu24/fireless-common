import { Class } from 'utility-types';
import { TransformPipe } from './transform.pipe';

export type KlassDecorator = <T>(klass: Class<T>) => Class<T>;

export type KlassMethodDecorator = <T extends {}, K extends keyof T>(
  target: T,
  methodName: K,
) => void;

export type KlassPropDecorator = <T extends {}, K extends keyof T>(
  target: T,
  methodName: K,
) => void;

export type KlassMethodParamDecorator = <T extends {}, K extends keyof T>(
  target: T,
  methodName: K,
  index: number,
) => void;

export type PipedDecorator<T> = (() => KlassMethodParamDecorator) &
  (<R>(p: Class<TransformPipe<T, R>>) => KlassMethodParamDecorator) &
  (<R1, R2>(
    p1: Class<TransformPipe<T, R1>>,
    p2: Class<TransformPipe<R1, R2>>,
  ) => KlassMethodParamDecorator) &
  (<R1, R2, R3>(
    p1: Class<TransformPipe<T, R1>>,
    p2: Class<TransformPipe<R1, R2>>,
    p3: Class<TransformPipe<R2, R3>>,
  ) => KlassMethodParamDecorator) &
  (<R1, R2, R3, R4>(
    p1: Class<TransformPipe<T, R1>>,
    p2: Class<TransformPipe<R1, R2>>,
    p3: Class<TransformPipe<R2, R3>>,
    p4: Class<TransformPipe<R3, R4>>,
  ) => KlassMethodParamDecorator) &
  (<R1, R2, R3, R4, R5>(
    p1: Class<TransformPipe<T, R1>>,
    p2: Class<TransformPipe<R1, R2>>,
    p3: Class<TransformPipe<R2, R3>>,
    p4: Class<TransformPipe<R3, R4>>,
    p5: Class<TransformPipe<R4, R5>>,
  ) => KlassMethodParamDecorator);

export type PipedHandlerParamDecorator<T extends {}> = PipedDecorator<T> &
  { [K in keyof T]: PipedDecorator<T[K]> };

export type PipedHandlerParamDecoratorCreatorOptions<T extends {}> = {
  key?: keyof T;
  pipes: Class<TransformPipe<any, any>>[];
};

export type PipedHandlerParamDecoratorCreator<T extends {}> = (
  options: PipedHandlerParamDecoratorCreatorOptions<T>,
) => KlassMethodParamDecorator;
