import { RoleTypeEnum } from '../enum/account.enum';

export class AccountRegisterDTO {
  username: string;
  password: string;
  role: RoleTypeEnum;
  salt: string;
}
