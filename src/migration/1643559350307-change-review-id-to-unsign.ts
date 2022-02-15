import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const table = 'reviews';
export class ChangeReviewIdToUnsign1643559350307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      table,
      new TableColumn({
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
      new TableColumn({
        name: 'id',
        type: 'int',
        unsigned: true,
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      table,
      new TableColumn({
        name: 'id',
        type: 'int',
        unsigned: true,
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
      new TableColumn({
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }
}
