import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  // In a production ready application, these would be read from configuration/ConfigService
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'srvcontdemo123&', // only local development DB passwords would be found in source code, sensitive values must always be stored in a secure vault
  database: process.env.DB_DATABASE || 'localdev',
  entities: [User],
};

export const createDatabaseIfNotExists = async () => {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    database: 'mysql' as any,
  });
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  try {
    const dbName = `${dataSourceOptions.database ?? 'default'}`;
    console.log(`Ensuring database '${dbName}' exists...`);
    await queryRunner.createDatabase(dbName, true);
    console.log('Success');
  } finally {
    await queryRunner.release();
  }
};

// This is only used by the TypeORM CLI:
export default new DataSource({
  ...dataSourceOptions,
  migrations: ['src/db-migrations/*.ts'],
});
