import {
  ApiSource,
  ExactProps,
  IsOptional,
  Min,
  MinLength,
  TransformNumber,
} from '@roxavn/core/base';
import { ModuleInfo } from '@roxavn/core/server';

import { baseModule } from '../module.js';
import { scopes } from '../access.js';

const moduleSource = new ApiSource<ModuleInfo>([scopes.ModuleInfo], baseModule);

class GetModulesRequest extends ExactProps<GetModulesRequest> {
  @Min(1)
  @TransformNumber()
  @IsOptional()
  public readonly page?: number;
}

class RunInstallHookMRequest extends ExactProps<RunInstallHookMRequest> {
  @MinLength(1)
  public readonly moduleName: string;
}

export const moduleApi = {
  getMany: moduleSource.getMany({
    validator: GetModulesRequest,
  }),
  runInstallHook: moduleSource.update({
    validator: RunInstallHookMRequest,
  }),
};
