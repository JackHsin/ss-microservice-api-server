import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const table = 'feedbacks';
const schema = 'app';
export class Feedback1639474352747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema,
        name: table,
        columns: [
          {
            name: 'review_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },

          {
            name: 'reviewer_account_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },

          {
            name: 'feedback',
            isNullable: true,
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      new Table({
        schema,
        name: table,
      }),
      new TableIndex({
        name: 'IDX_FEEDBACK_REVIEW_ID_REVIEWER_ACCOUNT_ID',
        columnNames: ['review_id', 'reviewer_account_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      new Table({
        schema,
        name: table,
      }),
      'IDX_FEEDBACK_REVIEW_ID_REVIEWER_ACCOUNT_ID',
    );
    await queryRunner.dropTable(
      new Table({
        schema,
        name: table,
      }),
    );
  }
}
