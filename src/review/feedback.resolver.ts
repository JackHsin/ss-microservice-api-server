import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/account/guard/roles.guard';
import { RoleTypeEnum } from 'src/account/enum/account.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Feedback } from './entities/feedback.entity.gql';
import { FeedbackService } from './services/feedback.service';
import { Review } from './entities/review.entity.gql';
import { SubmitFeedbackInput } from './dto/submit-feedback.input';
import { GqlJwtAuthGuard } from 'src/auth/jwt/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/graphql-current-user.decorator';
import { CurrentUserDTO } from 'src/common/dto/current-user-decorator.dto';

@UseGuards(RolesGuard)
@Roles(RoleTypeEnum.ADMIN, RoleTypeEnum.EMPLOYEE)
@UseGuards(GqlJwtAuthGuard)
@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private feedbackService: FeedbackService) {}

  @Mutation(() => Feedback)
  async submit(
    @Args('submitFeedbackInput') submitFeedbackInput: SubmitFeedbackInput,
  ) {
    return await this.feedbackService.submitFeedback(submitFeedbackInput);
  }

  @Query(() => [Review], { name: 'findAllNeedToFeedbackReviews' })
  async findAllNeedToFeedbackReviews(@CurrentUser() user: CurrentUserDTO) {
    return await this.feedbackService.findAllRequireFeedbackReviews(user.sub);
  }
}
