import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackRepository } from './repositories/feedback.repository';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewService } from './services/review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService, ReviewRepository, FeedbackRepository],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
