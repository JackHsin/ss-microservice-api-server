import {
  BaseEntity as BaseEntityOrigin,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseEntityOrigin {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
