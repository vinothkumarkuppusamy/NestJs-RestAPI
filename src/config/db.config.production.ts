import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from "path";

export default (): PostgresConnectionOptions => ({
  
  type: 'postgres',
  url: process.env.URL, // always on top
  port: +process.env.PORT,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: false,  
});