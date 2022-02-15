import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { ReviewService } from './services/review.service';
import { Review } from './entities/review.entity.gql';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { AssignReviewInput } from './dto/assign-review.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/account/guard/roles.guard';
import { RoleTypeEnum } from 'src/account/enum/account.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GqlJwtAuthGuard } from 'src/auth/jwt/graphql-jwt-auth.guard';
import { Feedback } from './entities/feedback.entity.gql';
import { FeedbackService } from './services/feedback.service';
import { Account } from '../account/entities/account.entity.gql';
import { AccountService } from 'src/account/account.service';
import DataLoader from 'dataloader';

@UseGuards(RolesGuard)
@Roles(RoleTypeEnum.ADMIN)
@UseGuards(GqlJwtAuthGuard)
@Resolver(() => Review)
export class ReviewResolver {
  constructor(
    private reviewService: ReviewService,
    private feedbackService: FeedbackService,
    private accountService: AccountService,
  ) {}

  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return this.reviewService.create(createReviewInput);
  }

  @Mutation(() => Review)
  assignEmployeesToReview(
    @Args('assignReviewInput') assignReviewInput: AssignReviewInput,
  ) {
    return this.reviewService.assignEmployeesToReview(assignReviewInput);
  }

  @Query(() => [Review], { name: 'findAllReviews' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Query(() => [Review], { name: 'findAllReviews_testRealGraphql' })
  findAllReviews_testRealGraphql() {
    console.log('\x1b[32m', '\n--------------Debug----------------\n');
    console.log('\x1b[36m', `findAllReviews_testRealGraphql = `);
    console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    return this.reviewService.findAll_testRealGraphql();
  }

  @ResolveField(() => Feedback)
  async feedbacks(@Parent() review: Review, @Context() context: any) {
    // console.log(context.randomValue);
    // console.log('\x1b[32m', '\n--------------Debug----------------\n');
    // console.log('\x1b[36m', `ResolveField feedbacks`);
    // console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    const { id } = review;
    return this.feedbackService.findAll(id);
  }

  @ResolveField(() => Account)
  async accounts(
    @Parent() review: Review,
    @Context('accountsLoader') accountsLoader: DataLoader<number, Account>,
  ) {
    console.log('\x1b[32m', '\n--------------Debug----------------\n');
    console.log('\x1b[36m', `ResolveField accounts`);
    console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    const { subjectAccountId } = review;
    // return this.accountService.findOneById(subjectAccountId);

    //Using DataLoader to load the corresponding AccountId from accountService.findByIds result array
    return accountsLoader.load(subjectAccountId);
  }

  @Query(() => Review, { name: 'findOneReviewById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.remove(id);
  }
}
