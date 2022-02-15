import { InputType, Int, Field } from '@nestjs/graphql';
import { RoleTypeEnum } from '../enum/account.enum';

@InputType()
export class CreateAccountInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: RoleTypeEnum;
}
