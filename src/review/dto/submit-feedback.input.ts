import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SubmitFeedbackInput {
  @Field(() => Int)
  reviewerAccountId: number;

  @Field(() => Int)
  reviewId: number;

  @Field()
  feedback: string;
}
