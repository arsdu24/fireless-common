import {TransformPipe} from '../../type';
import {Class} from 'utility-types';
import {resolveDependency} from "@fireless/core";

export function composeTransformPipes<R>(): Class<TransformPipe<R, R>>;
export function composeTransformPipes<R1, R2>(
  pipe: Class<TransformPipe<R1, R2>>,
): Class<TransformPipe<R1, R2>>;
export function composeTransformPipes<R1, R2, R3>(
  pipe1: Class<TransformPipe<R1, R2>>,
  pipe2: Class<TransformPipe<R2, R3>>,
): Class<TransformPipe<R1, R3>>;
export function composeTransformPipes<R1, R2, R3, R4>(
  pipe1: Class<TransformPipe<R1, R2>>,
  pipe2: Class<TransformPipe<R2, R3>>,
  pipe3: Class<TransformPipe<R2, R4>>,
): Class<TransformPipe<R1, R4>>;
export function composeTransformPipes<R1, R2, R3, R4, R5>(
  pipe1: Class<TransformPipe<R1, R2>>,
  pipe2: Class<TransformPipe<R2, R3>>,
  pipe3: Class<TransformPipe<R2, R4>>,
  pipe4: Class<TransformPipe<R2, R5>>,
): Class<TransformPipe<R1, R5>>;
export function composeTransformPipes(
  ...pips: Class<TransformPipe<any, any>>[]
): Class<TransformPipe<any, any>>;
export function composeTransformPipes(
  ...pipes: Class<TransformPipe<any, any>>[]
): Class<TransformPipe<any, any>> {
  return class implements TransformPipe<any, any> {
    transform(data: any) {
      return pipes
        .map(
          (
            pipeConstructor: Class<TransformPipe<any, any>>,
          ): TransformPipe<any, any> =>
              resolveDependency(pipeConstructor),
        )
        .reduce(
          (chain: Promise<any>, pipe: TransformPipe<any, any>): Promise<any> =>
            chain.then((data: any) => pipe.transform(data)),
          Promise.resolve(data) as Promise<any>,
        );
    }
  };
}
