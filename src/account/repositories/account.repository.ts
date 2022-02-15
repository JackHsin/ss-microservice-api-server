import { AccountEntity } from '../entities/account.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(AccountEntity)
export class AccountRepository extends BaseRepository<AccountEntity> {}
