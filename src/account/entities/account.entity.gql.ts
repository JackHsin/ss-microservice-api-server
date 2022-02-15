import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RoleTypeEnum } from '../enum/account.enum';

@ObjectType()
export class Account {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  role: RoleTypeEnum;
}

@ObjectType()
export class AccountId {
  @Field(() => Int)
  id: number;
}
