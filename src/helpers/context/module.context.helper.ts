import {
  getModulesContext,
  ModuleContext,
  AbstractModule,
  ControllerContext,
  getControllerContext,
} from '@fireless/core';
import { Class } from 'utility-types';

export function setModuleContextOptions<
  O extends {},
  E extends {},
  CO extends {},
  HO extends {}
>(Target: Class<any>, Module: Class<AbstractModule<O, E, CO, HO>>, options: O) {
  const ctx: ModuleContext<O, E, CO, HO> = getModulesContext<O, E, CO, HO>(
    Target,
    Module,
  );

  ctx.options = options;
}

export function getModuleContextOptions<
  O extends {},
  E extends {},
  CO extends {},
  HO extends {}
>(Target: Class<any>, Module: Class<AbstractModule<O, E, CO, HO>>): O {
  const ctx: ModuleContext<O, E, CO, HO> = getModulesContext<O, E, CO, HO>(
    Target,
    Module,
  );

  return ctx.options as O;
}

export function setModuleContextControllers<
  O extends {},
  E extends {},
  CO extends {},
  HO extends {}
>(
  Target: Class<any>,
  Module: Class<AbstractModule<O, E, CO, HO>>,
  controllers: Class<any>[],
) {
  const ctx: ModuleContext<O, E, CO, HO> = getModulesContext<O, E, CO, HO>(
    Target,
    Module,
  );

  ctx.controllerContextList = controllers.map(
    <T extends {}>(Controller: Class<T>): ControllerContext<T, CO, E, HO> => {
      return getControllerContext<T, CO, E, HO>(Controller);
    },
  );
}
