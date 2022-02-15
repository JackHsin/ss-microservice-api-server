import { CreateReviewInput } from './create-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFeedbackInput extends PartialType(CreateReviewInput) {
  @Field(() => Int)
  id: number;
}
