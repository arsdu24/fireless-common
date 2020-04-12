import {
  ControllerContext,
  getControllerContext,
  HandlerContext,
  AsyncResolver,
} from '@fireless/core';
import { Class } from 'utility-types';

export function getControllerHandlerContext<
  T extends {},
  O extends {},
  E extends {},
  HO extends {}
>(Target: Class<T>, handlerName: keyof T): HandlerContext<HO, E> {
  const ctx: ControllerContext<T, O, E, HO> = getControllerContext<T, O, E, HO>(
    Target,
  );
  let hCtx: HandlerContext<HO, E> | undefined = ctx.handlerContextMap.get(
    handlerName,
  );

  if (!hCtx) {
    hCtx = new HandlerContext<HO, E>();

    ctx.handlerContextMap.set(handlerName, hCtx);
  }

  return hCtx;
}

export function getControllerHandlerContextOptions<
  T extends {},
  O extends {},
  E extends {},
  HO extends {}
>(Target: Class<T>, handlerName: keyof T): HO {
  const ctx: HandlerContext<HO, E> = getControllerHandlerContext(
    Target,
    handlerName,
  );

  return ctx.options as HO;
}

export function setControllerHandlerContextOptions<
  T extends {},
  O extends {},
  E extends {},
  HO extends {}
>(Target: Class<T>, handlerName: keyof T, options: HO) {
  const ctx: HandlerContext<HO, E> = getControllerHandlerContext<T, O, E, HO>(
    Target,
    handlerName,
  );

  ctx.options = options;
}

export function setControllerHandlerContextParamResolver<
  T extends {},
  O extends {},
  E extends {},
  HO extends {},
  R = any
>(
  Target: Class<T>,
  handlerName: keyof T,
  index: number,
  paramResolver: AsyncResolver<E, R>,
) {
  const ctx: HandlerContext<HO, E> = getControllerHandlerContext<T, O, E, HO>(
    Target,
    handlerName,
  );

  ctx.paramResolverList[index] = paramResolver;
}

export function wrapControllerHandlerContextParamResolver<
  T extends {},
  O extends {},
  E extends {},
  HO extends {},
  R = any
>(
  Target: Class<T>,
  handlerName: keyof T,
  index: number,
  wrapper: <R1 = R, R2 = any>(
    resolver?: AsyncResolver<E, R1>,
  ) => AsyncResolver<E, R2>,
) {
  const ctx: HandlerContext<HO, E> = getControllerHandlerContext<T, O, E, HO>(
    Target,
    handlerName,
  );

  ctx.paramResolverList[index] = wrapper(ctx.paramResolverList[index]);
}
