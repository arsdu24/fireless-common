import { ControllerContext, getControllerContext } from '@fireless/core';
import { Class } from 'utility-types';

export function setControllerContextOptions<
  T extends {},
  O extends {},
  E extends {},
  HO extends {}
>(Target: Class<T>, options: O) {
  const ctx: ControllerContext<T, O, E, HO> = getControllerContext<T, O, E, HO>(
    Target,
  );

  ctx.options = options;
}

export function getControllerContextOptions<
  T extends {},
  O extends {},
  E extends {},
  HO extends {}
>(Target: Class<T>): O {
  const ctx: ControllerContext<T, O, E, HO> = getControllerContext<T, O, E, HO>(
    Target,
  );

  return ctx.options as O;
}
