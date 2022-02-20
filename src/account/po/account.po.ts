import { Expose, plainToClass } from 'class-transformer';
import { AccountEntity } from '../entities/account.entity';
import { RoleTypeEnum } from '../enum/account.enum';

export class AccountPO {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  role: RoleTypeEnum;

  @Expose()
  salt: string;

  static entityToClass(entity: AccountEntity) {
    return plainToClass(AccountPO, entity, { excludeExtraneousValues: true });
  }
}
