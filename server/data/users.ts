import faker from 'faker';
import { User } from '../../src/types/User';

export const generateUser = (overrides: Partial<User> = {}) => {
  const {
    email,
    name,
    username,
    avatar,
  } = faker.helpers.contextualCard();
  const password = faker.internet.password(8, true);
  const bio = faker.datatype.boolean ? faker.commerce.productDescription() : undefined;
  
  const user: User = {
    id: faker.datatype.uuid(),
    name,
    email,
    password,
    username,
    avatar,
    bio,
    followers: [],
    following: [],
    starredPosts: [],
    ...overrides
  };

  return user;
}