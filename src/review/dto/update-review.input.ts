import { InputType, Int, Field } from '@nestjs/graphql';
import { ReviewStatusEnum } from '../enum/review.enum';

@InputType()
export class UpdateReviewInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  subjectAccountId?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: ReviewStatusEnum;

  @Field({ nullable: true })
  expiredAt?: Date;

  @Field(() => [String], { nullable: true })
  reviewerAccountIds?: string[];
}
