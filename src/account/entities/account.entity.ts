import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { RoleTypeEnum } from '../enum/account.enum';

@Entity('accounts', { schema: 'app' })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ type: 'varchar', unique: true }) username: string;

  @Column({ type: 'varchar' }) password: string;

  @Column({ type: 'varchar' }) role: RoleTypeEnum;

  @Column({ type: 'varchar' }) salt: string;
}
