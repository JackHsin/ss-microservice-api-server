import { SetMetadata } from '@nestjs/common';
import { RoleTypeEnum } from '../../account/enum/account.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleTypeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
