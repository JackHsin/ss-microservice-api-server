import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const table = 'reviews';
const schema = 'app';
export class Review1639474348394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('app', true);
    await queryRunner.createTable(
      new Table({
        schema,
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'subject_account_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },

          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar(1024)',
          },

          {
            name: 'status',
            type: 'varchar',
          },

          {
            name: 'expired_at',
            type: 'timestamp',
            isNullable: true,
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
        name: 'IDX_SUBJECT_ACCOUNT_ID_NAME',
        columnNames: ['subject_account_id', 'name'],
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
      'IDX_SUBJECT_ACCOUNT_ID_NAME',
    );
    await queryRunner.dropTable(
      new Table({
        schema,
        name: table,
      }),
    );
  }
}
