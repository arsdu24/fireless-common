import {AsyncResolver, resolveDependency} from '@fireless/core';
import {TransformPipe} from '../../type';
import {composeTransformPipes} from './compose-transform.pipes.helper';
import {Class} from 'utility-types';

export function asyncResolverFromTransformPipes<R>(): AsyncResolver<R, R>;
export function asyncResolverFromTransformPipes<R1, R2>(
  pipe: Class<TransformPipe<R1, R2>>,
): AsyncResolver<R1, R2>;
export function asyncResolverFromTransformPipes<R1, R2, R3>(
  pipe1: Class<TransformPipe<R1, R2>>,
  pipe2: Class<TransformPipe<R2, R3>>,
): AsyncResolver<R1, R3>;
export function asyncResolverFromTransformPipes<R1, R2, R3, R4>(
  pipe1: Class<TransformPipe<R1, R2>>,
  pipe2: Class<TransformPipe<R2, R3>>,
  pipe3: Class<TransformPipe<R2, R4>>,
): AsyncResolver<R1, R4>;
export function asyncResolverFromTransformPipes<R1, R2, R3, R4, R5>(
  pipe1: Class<TransformPipe<R1, R2>>,
  pipe2: Class<TransformPipe<R2, R3>>,
  pipe3: Class<TransformPipe<R2, R4>>,
  pipe4: Class<TransformPipe<R2, R5>>,
): AsyncResolver<R1, R5>;
export function asyncResolverFromTransformPipes(
  ...pips: Class<TransformPipe<any, any>>[]
): AsyncResolver<any, any>;
export function asyncResolverFromTransformPipes(
  ...pipes: Class<TransformPipe<any, any>>[]
): AsyncResolver<any, any> {
  return async (data: any) =>
      resolveDependency(composeTransformPipes(...pipes))
      .transform(data);
}
