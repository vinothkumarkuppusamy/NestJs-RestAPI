import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SeederFactoryManager } from 'typeorm-extension';
import { Property } from '../entities/property.entity';
import { propertyFeature } from '../entities/propertyFeature.entity';
import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // ✅ Get repositories & factories
    const userFactory = factoryManager.get(User);
    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(propertyFeature);

    const userRepo = dataSource.getRepository(User);
    const propertyRepo = dataSource.getRepository(Property);
    const propertyFeatureRepo = dataSource.getRepository(propertyFeature);

    // ✅ Generate & Save 10 Users
    const users = await userFactory.saveMany(10);
    console.log('✅ Users inserted');

    // ✅ Generate & Save 10 Properties with Features
    const properties = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        // ✅ Create and save propertyFeature
        const propertyFeature = await propertyFeatureFactory.save({
          area: faker.number.int({ min: 25, max: 25000 }),
          rooms: faker.number.int({ min: 1, max: 4 }),
          hasSwimmingPool: faker.number.int({ min: 0, max: 2 }),
        });

        if (!propertyFeature) {
          throw new Error('❌ Failed to create propertyFeature');
        }

        // ✅ Create property object with valid values
        const propertyData = {
          name: faker.location.street(),
          price: +faker.commerce.price({ min: 3000, max: 40000 }),
          description: faker.lorem.sentence(),
          user: faker.helpers.arrayElement(users), // ✅ Assign random user
          propertyFeature: propertyFeature, // ✅ Assign propertyFeature
        };

        // ✅ Save the property in DB
        const savedProperty = await propertyFactory.save(propertyData);

        return savedProperty;
      }),
    );

    await propertyRepo.save(properties); // ✅ Save all properties at once
    console.log('✅ Properties inserted');
  }
}
