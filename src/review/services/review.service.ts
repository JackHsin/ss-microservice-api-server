import { Injectable } from '@nestjs/common';
import { AssignReviewInput } from '../dto/assign-review.input';
import { CreateReviewInput } from '../dto/create-review.input';
import { UpdateReviewInput } from '../dto/update-review.input';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { ReviewRepository } from '../repositories/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private feedbackRepository: FeedbackRepository,
  ) {}

  async create(createReviewInput: CreateReviewInput) {
    const reviewEntity = await this.reviewRepository.save({
      ...createReviewInput,
    });
    const { reviewerAccountIds } = createReviewInput;
    const { id } = reviewEntity;

    reviewerAccountIds.forEach(async (reviewerAccountId) => {
      await this.feedbackRepository.save({
        reviewId: id,
        reviewerAccountId: Number(reviewerAccountId),
      });
    });

    return reviewEntity;
  }

  async assignEmployeesToReview(assignReviewInput: AssignReviewInput) {
    const { id: reviewId, reviewerAccountIds } = assignReviewInput;
    const reviewEntity = await this.reviewRepository.findOne(reviewId);

    if (!reviewEntity) {
      throw new Error('Review Not Exists');
    }

    reviewerAccountIds.forEach(async (reviewerAccountId) => {
      await this.feedbackRepository.save({
        reviewId: reviewId,
        reviewerAccountId: Number(reviewerAccountId),
      });
    });

    return reviewEntity;
  }

  async findAll() {
    return await this.reviewRepository.find({ relations: ['feedbacks'] });
  }

  async findAll_testRealGraphql() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    return await this.reviewRepository.findOne(id);
  }

  async update(id: number, updateReviewInput: UpdateReviewInput) {
    const reviewId = updateReviewInput.id;
    return await this.reviewRepository.update(reviewId, updateReviewInput);
  }

  async remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
