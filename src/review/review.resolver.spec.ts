import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '../account/repositories/account.repository';
import { AccountService } from '../account/account.service';
import { FeedbackRepository } from './repositories/feedback.repository';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewResolver } from './review.resolver';
import { FeedbackService } from './services/feedback.service';
import { ReviewService } from './services/review.service';

describe('ReviewResolver', () => {
  let resolver: ReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewResolver,
        ReviewService,
        FeedbackService,
        AccountService,
        ReviewRepository,
        FeedbackRepository,
        AccountRepository,
      ],
    }).compile();

    resolver = module.get<ReviewResolver>(ReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
