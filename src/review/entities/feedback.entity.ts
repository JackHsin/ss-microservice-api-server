import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ReviewEntity } from './review.entity';

@Entity('feedbacks', { schema: 'app' })
@Index(
  'IDX_FEEDBACK_REVIEW_ID_REVIEWER_ACCOUNT_ID',
  ['reviewId', 'reviewerAccountId'],
  {
    unique: true,
  },
)
export class FeedbackEntity extends BaseEntity {
  @PrimaryColumn({ name: 'review_id', type: 'int' }) reviewId: number;

  @PrimaryColumn({ name: 'reviewer_account_id', type: 'int' })
  reviewerAccountId: number;

  @Column({ type: 'text', nullable: true }) feedback?: string;

  @ManyToOne(() => ReviewEntity, (review) => review.feedbacks)
  @JoinColumn({ name: 'review_id' })
  review: ReviewEntity;
}
