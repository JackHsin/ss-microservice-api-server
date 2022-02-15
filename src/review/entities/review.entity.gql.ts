import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Account } from '../../account/entities/account.entity.gql';
import { ReviewStatusEnum } from '../enum/review.enum';
import { Feedback } from './feedback.entity.gql';

@ObjectType()
export class Review {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  subjectAccountId: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  status: ReviewStatusEnum;

  @Field({ nullable: true })
  expiredAt?: Date;

  @Field((type) => [Feedback], { nullable: true })
  feedbacks: Feedback[];

  @Field((type) => Account)
  accounts: Account;
}
