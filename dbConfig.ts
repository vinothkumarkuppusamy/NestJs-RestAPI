
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from "dotenv";
dotenv.config();
export const pgConfig: PostgresConnectionOptions ={
    
    url: process.env.URL,
    type: "postgres",
    port: Number(process.env.PORT),
    entities: [__dirname+'/**/*.entity{.ts,.js}'], // add entity in here
    synchronize: true // Its not a right method for production
}
