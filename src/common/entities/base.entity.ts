import {
  BaseEntity as BaseEntityOrigin,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseEntityOrigin {
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
