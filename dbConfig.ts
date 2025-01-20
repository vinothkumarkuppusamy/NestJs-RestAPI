
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig: PostgresConnectionOptions ={
    
    url: "postgresql://nestdb_owner:yMnDKQAe3fG8@ep-jolly-dust-a532vq5t.us-east-2.aws.neon.tech/nestdb?sslmode=require",
    type: "postgres",
    port: 3306,
    entities: [__dirname+'/**/*.entity{.ts,.js}'], // add entity in here
    synchronize: true // Its not a right method for production
}