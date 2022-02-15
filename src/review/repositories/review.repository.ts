import { ReviewEntity } from '../entities/review.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends BaseRepository<ReviewEntity> {}
