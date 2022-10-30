import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  // In a real application, these would be read from configuration
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'srvcontdemo123&', // only local development DB passwords would be found in source code, sensitive values must always be stored in a secure vault
  database: 'localdev',
  entities: [User],
  migrations: ['src/db-migrations/*.ts']
}

export default new DataSource(dataSourceOptions);
