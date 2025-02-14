
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { propertyFactory } from "./property.factory";
import { userFactory } from "./user.factory";
import { propertyFeatureFactory } from "./propertyFeature.factory";
import { MainSeeder } from "./main.seeder";
import dbConfig from "../config/db.config";
/// seed the data in main file.
const options: DataSourceOptions & SeederOptions ={
    ...dbConfig(),
    factories: [propertyFactory, userFactory, propertyFeatureFactory],
    seeds: [MainSeeder] 
}

const dataSource = new DataSource(options);
dataSource.initialize().then(async() =>{
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
})