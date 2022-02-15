import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ReviewStatusEnum } from '../enum/review.enum';
import { FeedbackEntity } from './feedback.entity';

@Entity('reviews')
@Index('IDX_SUBJECT_ACCOUNT_ID_NAME', ['subjectAccountId', 'name'], {
  unique: true,
})
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ name: 'subject_account_id', type: 'int' }) subjectAccountId: number;

  @Column({ name: 'name', type: 'varchar' }) name: string;

  @Column({ name: 'description', type: 'varchar' }) description: string;

  @Column({ type: 'varchar' }) status: ReviewStatusEnum;

  @Column({ name: 'expired_at', nullable: true, type: 'datetime' })
  expiredAt?: Date;

  @OneToMany(() => FeedbackEntity, (feedbacks) => feedbacks.review, {
    cascade: true,
  })
  feedbacks?: FeedbackEntity[];
}
