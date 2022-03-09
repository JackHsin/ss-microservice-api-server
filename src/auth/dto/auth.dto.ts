import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { RoleTypeEnum } from '../../account/enum/account.enum';

export class UserInfoDTO {
  @IsString()
  @Expose()
  id: string;

  @IsEnum(RoleTypeEnum)
  @Expose()
  role: RoleTypeEnum;
}
