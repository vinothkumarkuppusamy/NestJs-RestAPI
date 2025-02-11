import { pgConfig } from "../../dbConfig";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { propertyFactory } from "./property.factory";
import { userFactory } from "./user.factory";
import { propertyFeatureFactory } from "./propertyFeature.factory";
import { MainSeeder } from "./main.seeder";
/// seed the data in main file.
const options: DataSourceOptions & SeederOptions ={
    ...pgConfig,
    factories: [propertyFactory, userFactory, propertyFeatureFactory],
    seeds: [MainSeeder] 
}

const dataSource = new DataSource(options);
dataSource.initialize().then(async() =>{
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
})