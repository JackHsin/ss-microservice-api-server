import { Injectable } from '@nestjs/common';
import { SubmitFeedbackInput } from '../dto/submit-feedback.input';
import { FeedbackRepository } from '../repositories/feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async submitFeedback(submitFeedbackInput: SubmitFeedbackInput) {
    const { reviewerAccountId, reviewId, feedback } = submitFeedbackInput;

    await this.feedbackRepository.update(
      { reviewId, reviewerAccountId },
      { feedback },
    );

    return await this.feedbackRepository.findOne({
      reviewId,
      reviewerAccountId,
    });
  }

  async findAllRequireFeedbackReviews(accountId) {
    const feedbackWithReviews =
      await this.feedbackRepository.findAllRequireFeedbackReviews(accountId);
    return feedbackWithReviews.map((feedbackWithReviews) => {
      return feedbackWithReviews.review;
    });
  }

  async findAll(reviewId: number) {
    const res = await this.feedbackRepository.find({ reviewId });
    // console.log('\x1b[32m', '\n--------------Debug----------------\n');
    // console.log('\x1b[36m', `res = `, res);
    // console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    return res;
  }
}
