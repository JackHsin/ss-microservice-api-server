import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './repositories/review.repository';
import { FeedbackRepository } from './repositories/feedback.repository';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './services/feedback.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewRepository, FeedbackRepository]),
    AccountModule,
  ],
  providers: [ReviewResolver, ReviewService, FeedbackResolver, FeedbackService],
})
export class ReviewModule {}
