import { FeedbackEntity } from '../entities/feedback.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {
  Datetime,
  DatetimeFormatYYYYMMDDHHMM,
} from '../../common/utils/datetime.util';

const table = 'feedbacks';
@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends BaseRepository<FeedbackEntity> {
  async findAllRequireFeedbackReviews(accountId: number) {
    const now = Datetime.datetime.now(DatetimeFormatYYYYMMDDHHMM);

    const qb = await this.createQueryBuilder(table)
      .andWhere(`${table}.reviewer_account_id = :accountId`, {
        accountId,
      })
      .andWhere(`${table}.feedback IS NULL`, {
        accountId,
      })
      .leftJoinAndSelect(`${table}.review`, 'r')
      .andWhere(`('${now}' < r.expiredAt OR r.expiredAt IS NULL)`)
      .getMany();

    return qb;
  }
}
