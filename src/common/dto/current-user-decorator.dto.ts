import { RoleTypeEnum } from '../../account/enum/account.enum';

export interface CurrentUserDTO {
  sub: number;
  role: RoleTypeEnum;
}
