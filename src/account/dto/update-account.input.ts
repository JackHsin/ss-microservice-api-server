import { CreateAccountInput } from './create-account.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { RoleTypeEnum } from '../enum/account.enum';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: RoleTypeEnum;
}
