const {
  MYSQL_MAPPING_DB_HOST,
  MYSQL_MAPPING_DB_PORT,
  MYSQL_ROOT_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

import { ConnectionOptions } from 'typeorm';
const typeormConfig: ConnectionOptions = {
  type: 'mysql',
  host: MYSQL_MAPPING_DB_HOST,
  port: parseInt(MYSQL_MAPPING_DB_PORT),
  username: MYSQL_ROOT_USER,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DATABASE,
  logging: true,
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  migrationsTableName: 'migrations',
  synchronize: false,
  charset: 'utf8mb4_unicode_ci',
  timezone: 'Z',
};

module.exports = typeormConfig;
