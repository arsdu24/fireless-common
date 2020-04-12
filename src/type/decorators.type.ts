import { Class } from 'utility-types';

export type ConstructorDecorator = <T>(klass: Class<T>) => Class<T>;

export type ControllerHandlerDecorator = <T extends {}>(
  target: T,
  methodName: keyof T,
  descriptor: PropertyDescriptor,
) => void;

export type ControllerHandlerParamDecorator = <T extends {}>(
  target: T,
  methodName: keyof T,
  index: number,
) => void;
