import {Class} from "utility-types";
import {
    HandlerParamDecorator, PipedDecorator,
    PipedHandlerParamDecorator,
    PipedHandlerParamDecoratorCreator,
    TransformPipe
} from "../../type";

export function createPipedHandlerParamDecorator<T extends {}>(resolver: PipedHandlerParamDecoratorCreator<T>): PipedHandlerParamDecorator<T> {
    return new Proxy(() => {}, {
        apply(target: Function, thisArg: any, pipes?: Class<TransformPipe<any, any>>[]): HandlerParamDecorator {
            return resolver({ pipes: (pipes || []) });
        },
        get<K extends keyof T>(target: Function, key: K): PipedDecorator<T[K]> {
            return (...pipes: Class<TransformPipe<any, any>>[]) => resolver({
                pipes,
                key
            })
        }
    }) as PipedHandlerParamDecorator<T>
}