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
  const bio = faker.datatype.boolean() ? faker.commerce.productDescription() : undefined;
  const background = faker.image.image();
  
  const user: User = {
    id: faker.datatype.uuid(),
    name,
    email,
    password,
    username,
    avatar,
    background,
    bio,
    followers: [],
    following: [],
    starredPosts: [],
    posts: [],
    private: faker.datatype.boolean(),
    ...overrides
  };

  return user;
}