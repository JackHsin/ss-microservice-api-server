import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Feedback {
  @Field(() => Int)
  reviewId: number;

  @Field(() => Int)
  reviewerAccountId: number;

  @Field({ nullable: true })
  feedback: string;
}
