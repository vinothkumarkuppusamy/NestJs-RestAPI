import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from "path";
import { registerAs } from '@nestjs/config';

export default registerAs("dbConfig.dev", // first parameter namespace of the register custom configuration.
  (): PostgresConnectionOptions => ({
  
  type: 'postgres',
  url: process.env.URL, // always on top
  port: +process.env.PORT,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Don't use this in production
})); 


// registerAs() => to register the dbConfig factory function.
// 