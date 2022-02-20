import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const table = 'accounts';
export class AddSaltToAccountTable1645345670278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'salt',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      table,
      new TableColumn({
        name: 'salt',
        type: 'varchar',
      }),
    );
  }
}
