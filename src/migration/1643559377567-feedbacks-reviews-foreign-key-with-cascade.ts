import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const table = 'feedbacks';
const schema = 'app';
export class FeedbacksReviewsForeignKeyWithCascade1643559377567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      new Table({
        schema,
        name: table,
      }),
      new TableForeignKey({
        columnNames: ['review_id'],
        referencedSchema: schema,
        referencedTableName: 'reviews',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      new Table({
        schema,
        name: table,
      }),
      new TableForeignKey({
        columnNames: ['review_id'],
        referencedSchema: schema,
        referencedTableName: 'reviews',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }
}
