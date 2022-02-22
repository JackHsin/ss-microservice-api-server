import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

const table = 'accounts';
const schema = 'app';
export class AddSaltToAccountTable1645345670278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      new Table({
        schema,
        name: table,
      }),
      new TableColumn({
        name: 'salt',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      new Table({
        schema,
        name: table,
      }),
      new TableColumn({
        name: 'salt',
        type: 'varchar',
      }),
    );
  }
}
