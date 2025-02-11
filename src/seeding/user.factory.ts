import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export const userFactory = setSeederFactory(User, () => {
  const new_user = new User();
  new_user.firstName = faker.person.firstName();
  new_user.lastName = faker.person.lastName();
  new_user.email = faker.internet.email();
  new_user.avatarUrl = faker.image.avatar();
  return new_user;
});
