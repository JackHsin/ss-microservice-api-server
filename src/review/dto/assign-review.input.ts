import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AssignReviewInput {
  @Field(() => Int)
  id: number;

  @Field(() => [Int])
  reviewerAccountIds: number[];
}
