import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

const table = 'feedbacks';
export class FeedbacksReviewsForeignKeyWithCascade1643559377567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['review_id'],
        referencedTableName: 'reviews',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['review_id'],
        referencedTableName: 'reviews',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }
}
