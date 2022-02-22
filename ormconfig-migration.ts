const {
  POSTGRES_MAPPING_DB_HOST,
  POSTGRES_MAPPING_DB_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

import { ConnectionOptions } from 'typeorm';
const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_MAPPING_DB_HOST,
  port: parseInt(POSTGRES_MAPPING_DB_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  logging: true,
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  migrationsTableName: 'migrations',
  synchronize: false,
  // charset: 'utf8mb4_unicode_ci',
  // timezone: 'Z',
};

module.exports = typeormConfig;
