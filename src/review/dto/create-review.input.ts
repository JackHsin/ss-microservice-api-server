import { InputType, Int, Field } from '@nestjs/graphql';
import { ReviewStatusEnum } from '../enum/review.enum';

@InputType()
export class CreateReviewInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int)
  subjectAccountId: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true, defaultValue: ReviewStatusEnum.REVIEWING })
  status?: ReviewStatusEnum;

  @Field({ nullable: true })
  expiredAt?: Date;

  @Field(() => [Int])
  reviewerAccountIds: number[];
}
