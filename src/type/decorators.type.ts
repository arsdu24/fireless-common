import { Class } from 'utility-types';
import {TransformPipe} from "./transform.pipe";

export type ConstructorDecorator = <T>(klass: Class<T>) => Class<T>;

export type HandlerDecorator = <T extends {}>(
  target: T,
  methodName: keyof T,
  descriptor: PropertyDescriptor,
) => void;

export type HandlerParamDecorator = <T extends {}>(
  target: T,
  methodName: keyof T,
  index: number,
) => void;

export type PipedDecorator<T> = (() => HandlerParamDecorator) &
    (<R>(p: Class<TransformPipe<T, R>>) => HandlerParamDecorator) &
    (<R1, R2>(p1: Class<TransformPipe<T, R1>>, p2: Class<TransformPipe<R1, R2>>) => HandlerParamDecorator) &
    (<R1, R2, R3>(p1: Class<TransformPipe<T, R1>>, p2: Class<TransformPipe<R1, R2>>, p3: Class<TransformPipe<R2, R3>>) => HandlerParamDecorator) &
    (<R1, R2, R3, R4>(p1: Class<TransformPipe<T, R1>>, p2: Class<TransformPipe<R1, R2>>, p3: Class<TransformPipe<R2, R3>>, p4: Class<TransformPipe<R3, R4>>) => HandlerParamDecorator) &
    (<R1, R2, R3, R4, R5>(p1: Class<TransformPipe<T, R1>>, p2: Class<TransformPipe<R1, R2>>, p3: Class<TransformPipe<R2, R3>>, p4: Class<TransformPipe<R3, R4>>, p5: Class<TransformPipe<R4, R5>>) => HandlerParamDecorator)

export type PipedHandlerParamDecorator<T extends {}> = PipedDecorator<T> &
    {[K in keyof T]: PipedDecorator<T>};

export type PipedHandlerParamDecoratorCreatorOptions<T extends {}> = { key?: keyof T, pipes: Class<TransformPipe<any, any>>[] }

export type PipedHandlerParamDecoratorCreator<T extends {}> = (options: PipedHandlerParamDecoratorCreatorOptions<T>) => HandlerParamDecorator
