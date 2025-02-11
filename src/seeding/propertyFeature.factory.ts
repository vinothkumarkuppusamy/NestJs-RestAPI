import { faker } from '@faker-js/faker';
import { propertyFeature } from '../entities/propertyFeature.entity';
import { setSeederFactory } from 'typeorm-extension';

export const propertyFeatureFactory = setSeederFactory(
  propertyFeature,
  () => {
    const feature = new propertyFeature();
    feature.area = faker.number.int({ min: 25, max: 25000 });
    feature.rooms = faker.number.int({ min: 1, max: 4 });
    feature.hasSwimmingPool = faker.number.int({ min: 0, max: 2 });
    return feature;
  },
);
